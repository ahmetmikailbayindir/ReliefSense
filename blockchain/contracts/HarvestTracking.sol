// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title HarvestTracking
 * @dev Immutable record of crop harvests for transparency and aid distribution
 * @notice Tracks harvest data on blockchain for auditable food security reporting
 */
contract HarvestTracking {
    struct Harvest {
        uint256 id;
        address farmer;
        string cropType;
        uint256 quantityKg;
        uint256 timestamp;
        string location;
        bool verified;
        address verifiedBy;
    }

    struct Location {
        string name;
        string country;
        string locationType; // refugee_camp, community_garden, training_center
        bool active;
    }

    uint256 public harvestCounter;
    address public owner;

    mapping(uint256 => Harvest) public harvests;
    mapping(address => uint256[]) public farmerHarvests;
    mapping(string => Location) public locations;
    mapping(address => bool) public verifiers;

    event HarvestRecorded(
        uint256 indexed harvestId,
        address indexed farmer,
        string cropType,
        uint256 quantityKg,
        string location
    );

    event HarvestVerified(
        uint256 indexed harvestId,
        address indexed verifier
    );

    event LocationRegistered(
        string locationId,
        string name,
        string country
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyVerifier() {
        require(verifiers[msg.sender] || msg.sender == owner, "Not authorized verifier");
        _;
    }

    constructor() {
        owner = msg.sender;
        verifiers[msg.sender] = true;
        harvestCounter = 0;
    }

    /**
     * @dev Register a new location for harvest tracking
     */
    function registerLocation(
        string memory _locationId,
        string memory _name,
        string memory _country,
        string memory _locationType
    ) public onlyOwner {
        locations[_locationId] = Location({
            name: _name,
            country: _country,
            locationType: _locationType,
            active: true
        });

        emit LocationRegistered(_locationId, _name, _country);
    }

    /**
     * @dev Add a new verifier (e.g., UN staff, NGO worker)
     */
    function addVerifier(address _verifier) public onlyOwner {
        verifiers[_verifier] = true;
    }

    /**
     * @dev Record a new harvest
     */
    function recordHarvest(
        string memory _cropType,
        uint256 _quantityKg,
        string memory _location
    ) public returns (uint256) {
        require(locations[_location].active, "Location not registered");
        require(_quantityKg > 0, "Quantity must be greater than 0");

        harvestCounter++;

        harvests[harvestCounter] = Harvest({
            id: harvestCounter,
            farmer: msg.sender,
            cropType: _cropType,
            quantityKg: _quantityKg,
            timestamp: block.timestamp,
            location: _location,
            verified: false,
            verifiedBy: address(0)
        });

        farmerHarvests[msg.sender].push(harvestCounter);

        emit HarvestRecorded(
            harvestCounter,
            msg.sender,
            _cropType,
            _quantityKg,
            _location
        );

        return harvestCounter;
    }

    /**
     * @dev Verify a harvest record (by authorized verifier)
     */
    function verifyHarvest(uint256 _harvestId) public onlyVerifier {
        require(_harvestId > 0 && _harvestId <= harvestCounter, "Invalid harvest ID");
        require(!harvests[_harvestId].verified, "Already verified");

        harvests[_harvestId].verified = true;
        harvests[_harvestId].verifiedBy = msg.sender;

        emit HarvestVerified(_harvestId, msg.sender);
    }

    /**
     * @dev Get all harvests for a specific farmer
     */
    function getFarmerHarvests(address _farmer) public view returns (uint256[] memory) {
        return farmerHarvests[_farmer];
    }

    /**
     * @dev Get total verified harvest quantity for a crop type
     */
    function getTotalVerifiedHarvest(string memory _cropType) public view returns (uint256) {
        uint256 total = 0;

        for (uint256 i = 1; i <= harvestCounter; i++) {
            if (
                harvests[i].verified &&
                keccak256(bytes(harvests[i].cropType)) == keccak256(bytes(_cropType))
            ) {
                total += harvests[i].quantityKg;
            }
        }

        return total;
    }

    /**
     * @dev Get harvest details
     */
    function getHarvest(uint256 _harvestId) public view returns (
        address farmer,
        string memory cropType,
        uint256 quantityKg,
        uint256 timestamp,
        string memory location,
        bool verified,
        address verifiedBy
    ) {
        Harvest memory h = harvests[_harvestId];
        return (
            h.farmer,
            h.cropType,
            h.quantityKg,
            h.timestamp,
            h.location,
            h.verified,
            h.verifiedBy
        );
    }
}
