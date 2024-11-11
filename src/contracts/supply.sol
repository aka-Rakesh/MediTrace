// SPDX-License-Identifier: undefined
pragma solidity 0.8.19;

contract MedicalSupplyChain {
    
    enum Role { Manufacturer, Distributor, Hospital, Pharmacy }
    enum Status { Manufactured, InTransit, Delivered, Verified }

    struct Product {
        uint id;
        string name;
        address currentHolder;
        Status status;
        uint timestamp;
    }

    struct Entity {
        string name;
        Role role;
        bool authorized;
    }

    address public owner;
    uint public productCount = 0;

    mapping(uint => Product) public products;
    mapping(address => Entity) public entities;

    event ProductCreated(uint productId, string name, address indexed manufacturer);
    event ProductStatusUpdated(uint productId, Status status, address indexed holder);
    event EntityAdded(address indexed entityAddress, string name, Role role);
    event EntityAuthorized(address indexed entityAddress, bool authorized);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action.");
        _;
    }

    modifier onlyAuthorized() {
        require(entities[msg.sender].authorized, "Entity not authorized.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addEntity(address _entityAddress, string memory _name, Role _role) public onlyOwner {
        entities[_entityAddress] = Entity(_name, _role, false);
        emit EntityAdded(_entityAddress, _name, _role);
    }

    function authorizeEntity(address _entityAddress, bool _authorization) public onlyOwner {
        entities[_entityAddress].authorized = _authorization;
        emit EntityAuthorized(_entityAddress, _authorization);
    }

    function createProduct(string memory _name) public onlyAuthorized {
        require(entities[msg.sender].role == Role.Manufacturer, "Only manufacturers can create products.");
        
        productCount++;
        products[productCount] = Product(productCount, _name, msg.sender, Status.Manufactured, block.timestamp);
        emit ProductCreated(productCount, _name, msg.sender);
    }

    function updateProductStatus(uint _productId, Status _status) public onlyAuthorized {
        require(products[_productId].id != 0, "Product not found.");
        require(products[_productId].currentHolder == msg.sender, "Only current holder can update status.");
        
        products[_productId].status = _status;
        products[_productId].timestamp = block.timestamp;

        emit ProductStatusUpdated(_productId, _status, msg.sender);
    }

    function transferProduct(uint _productId, address _newHolder) public onlyAuthorized {
        require(products[_productId].id != 0, "Product not found.");
        require(products[_productId].currentHolder == msg.sender, "Only current holder can transfer product.");

        products[_productId].currentHolder = _newHolder;
        products[_productId].status = Status.InTransit;
        products[_productId].timestamp = block.timestamp;

        emit ProductStatusUpdated(_productId, Status.InTransit, _newHolder);
    }

    function verifyProduct(uint _productId) public view returns (Product memory) {
        require(products[_productId].id != 0, "Product not found.");
        return products[_productId];
    }
}