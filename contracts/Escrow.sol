// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Escrow is Ownable, ReentrancyGuard {
    using Address for address;

    uint256 public baseFeePercentage;
    uint256 public feeMultiplier;
    // bytes32 public

    struct Payment {
        uint256 id;
        uint256 amount;
        address sender;
        address receiver;
        uint256 timestamp;
        bool cancelled;
    }

    struct trackReceiverAddress {
        address receiver;
        bytes32 pin;
    }

    struct trackReceiverAmount {
        address receiver;
        uint256 amount;
    }

    mapping(uint256 => Payment) public payments;
    mapping(address => trackReceiverAddress) private trackReceiverAddresses;
    mapping(bytes32 => trackReceiverAmount) private trackReceiverAmounts;

    mapping(address => uint256[]) senderToIds;
    mapping(address => uint256[]) receiverToIds;

    uint256[] public paymentIds;

    event PaymentCreated(uint256 indexed paymentId);
    event PaymentCancelled(uint256 indexed paymentId);
    event PaymentReleased(uint256 indexed paymentId);

    constructor(uint256 _baseFeePercentage, uint256 _feeMultiplier) {
        require(_baseFeePercentage <= 10, "Base fee must be <= 2%");
        baseFeePercentage = _baseFeePercentage;
        feeMultiplier = _feeMultiplier;
    }

    function createPayment(address receiver) external payable {
        require(receiver != address(0), "Invalid receiver address");
        require(msg.value > 0, "Amount must be greater than zero");

        uint256 newPaymentId = paymentIds.length + 1;
        Payment storage payment = payments[newPaymentId];
        payment.id = newPaymentId;
        payment.amount = msg.value;
        payment.sender = msg.sender;
        payment.receiver = receiver;
        payment.timestamp = block.timestamp;
        payment.cancelled = false;

        paymentIds.push(newPaymentId);

        senderToIds[msg.sender].push(newPaymentId);
        receiverToIds[receiver].push(newPaymentId);

        emit PaymentCreated(newPaymentId);
    }

    function cancelPayment(uint256 paymentId) external nonReentrant {
        Payment storage payment = payments[paymentId];
        require(payment.amount != 0, "Payment does not exist");
        require(payment.sender == msg.sender, "Not authorized to cancel");
        require(!payment.cancelled, "Payment already cancelled");

        payment.cancelled = true;
        (bool success, ) = payable(payment.sender).call{value: payment.amount}(
            ""
        );
        if (!success) {
            revert("Payment failed");
        }
        emit PaymentCancelled(paymentId);
    }

    function releasePayment(uint256 paymentId) external nonReentrant {
        Payment storage payment = payments[paymentId];
        require(payment.amount != 0, "Payment does not exist");
        require(!payment.cancelled, "Payment already cancelled");
        require(payment.receiver == msg.sender, "Payment not for you");
        require(
            block.timestamp >= payment.timestamp + (5 minutes),
            "Release time not reached"
        );

        uint256 feeAmount = calculateFee(payment.amount);
        uint256 amountMinusFee = payment.amount - feeAmount;

        payment.cancelled = true;
        (bool success, ) = payable(payment.receiver).call{
            value: amountMinusFee
        }("");
        if (!success) {
            revert("Payment failed");
        }
        (bool success2, ) = payable(owner()).call{value: feeAmount}("");
        if (!success2) {
            revert("Payment failed");
        }

        emit PaymentReleased(paymentId);
    }

    function calculateFee(uint256 amount) internal view returns (uint256) {
        return (amount * baseFeePercentage * feeMultiplier) / 10000;
    }

    function getLastPaymentId() public view returns (uint256) {
        require(paymentIds.length > 0, "No payment exists");
        return paymentIds[paymentIds.length - 1];
    }

    function fetchSenderIds() public view returns (uint256[] memory) {
        return senderToIds[msg.sender];
    }

    function fetchReceiverIds() public view returns (uint256[] memory) {
        return receiverToIds[msg.sender];
    }

    function getPayment(
        uint256 paymentId
    ) public view returns (Payment memory) {
        return payments[paymentId];
    }
}
