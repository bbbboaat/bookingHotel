// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract HotelChain {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    // Add yoursel as a Renter
    struct Renter {
        address payable walletAddress;
        string firstName;
        string lastName;
        bool canRent;
        bool active;
        uint balance;
        uint due;
        uint start;
        uint end;
    }

    mapping(address => Renter) public renters;

    function addRenter(
        address payable walletAddress,
        string memory firstName,
        string memory lastName,
        bool canRent,
        bool active,
        uint balance,
        uint due,
        uint start,
        uint end
    ) public {
        renters[walletAddress] = Renter(
            walletAddress,
            firstName,
            lastName,
            canRent,
            active,
            balance,
            due,
            start,
            end
        );
    }

    // Checkout Hotel
    function Checkout(address walletAddress) public {
        require(renters[walletAddress].due == 0, "You have a pending balance");
        require(renters[walletAddress].canRent == true, "can rent this time");
        renters[walletAddress].active = true;
        renters[walletAddress].start = block.timestamp;
        renters[walletAddress].canRent = false;
    }

    // Check in Hotel
    function checkIn(address walletAddress) public {
        require(renters[walletAddress].active == false, "check out first");
        renters[walletAddress].active = false;
        renters[walletAddress].end = block.timestamp;
        setDue(walletAddress);
    }

    // Get total duration of renting
    function rentersTimespan(
        uint start,
        uint end
    ) internal pure returns (uint) {
        return end - start;
    }

    function getTotalDuration(
        address walletAddress
    ) public view returns (uint) {
        if (
            renters[walletAddress].start == 0 || renters[walletAddress].end == 0
        ) {
            return 0;
        } else {
            uint timespan = rentersTimespan(
                renters[walletAddress].start,
                renters[walletAddress].end
            );
            uint timespanInMinutes = timespan / 60;
            return timespanInMinutes;
        }
    }

    // Get contract balace
    function balanceOf() public view returns (uint) {
        return address(this).balance;
    }

    // Get Renter's balance
    function balanceOfRenter(address walletAddress) public view returns (uint) {
        return renters[walletAddress].balance;
    }

    // Set Due amount
    function setDue(address walletAddress) internal {
        uint timespanInMinutes = getTotalDuration(walletAddress);
        uint oneMinuteIncrements = timespanInMinutes / 60;
        renters[walletAddress].due = oneMinuteIncrements * 3000000000000000;
    }

    function canRentHotel(address walletAddress) public view returns (bool) {
        return renters[walletAddress].canRent;
    }

    // Doptsit
    function deposit(address walletAddress) public payable {
        renters[walletAddress].balance += msg.value;
    }

    // Make Payment
    function makePayment(address walletAddress) public payable {
        require(
            renters[walletAddress].due > 0,
            "You dont have anything due at this time"
        );
        require(
            renters[walletAddress].balance > msg.value,
            "You dont have enough fund"
        );
        renters[walletAddress].balance -= msg.value;
        renters[walletAddress].canRent = true;
        renters[walletAddress].due = 0;
        renters[walletAddress].start = 0;
        renters[walletAddress].end = 0;
    }

    function getDue(address walletAddress) public view returns (uint) {
        return renters[walletAddress].due;
    }

    function getRenter(
        address walletAddress
    )
        public
        view
        returns (
            string memory firstName,
            string memory lastName,
            bool canRent,
            bool active
        )
    {
        firstName = renters[walletAddress].firstName;
        lastName = renters[walletAddress].lastName;
        canRent = renters[walletAddress].canRent;
        active = renters[walletAddress].active;
    }

    function rentersExists(address walletAddress) public view returns (bool) {
        if (renters[walletAddress].walletAddress != address(0)) {
            return true;
        }
        return false;
    }
}
