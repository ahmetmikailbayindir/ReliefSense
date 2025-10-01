// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title ReliefToken
 * @dev ERC20-like token for humanitarian agriculture incentives
 * @notice This token rewards community members for contributing to agricultural projects
 */
contract ReliefToken {
    string public name = "ReliefToken";
    string public symbol = "RELIEF";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => bool) public verifiedFarmers;

    address public owner;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event FarmerVerified(address indexed farmer);
    event RewardDistributed(address indexed farmer, uint256 amount, string reason);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(uint256 _initialSupply) {
        owner = msg.sender;
        totalSupply = _initialSupply * 10 ** uint256(decimals);
        balanceOf[owner] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from], "Insufficient balance");
        require(_value <= allowance[_from][msg.sender], "Allowance exceeded");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    /**
     * @dev Verify a farmer address for participation in rewards program
     */
    function verifyFarmer(address _farmer) public onlyOwner {
        verifiedFarmers[_farmer] = true;
        emit FarmerVerified(_farmer);
    }

    /**
     * @dev Distribute rewards to verified farmers for their contributions
     */
    function distributeReward(address _farmer, uint256 _amount, string memory _reason) public onlyOwner {
        require(verifiedFarmers[_farmer], "Farmer not verified");
        require(balanceOf[owner] >= _amount, "Insufficient reward pool");

        balanceOf[owner] -= _amount;
        balanceOf[_farmer] += _amount;

        emit RewardDistributed(_farmer, _amount, _reason);
        emit Transfer(owner, _farmer, _amount);
    }
}
