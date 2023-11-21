// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

 /**
   * @title ProductAuthenticity
   * @dev This is a contract to store authentic Tx between authorized parties to check for real product in supply chain.
   */


contract ProductAuthenticity {

    /*
     * The Product struct represents a single product
     * @param name 
     * @param manufacturer 
     * @param currentHolder 
     * @param chainOfCustody 
     * @param isFinalized 
     * @param manufacturerAddress 
     */
    struct Product {
        string name;
        string manufacturer;
        address currentHolder;
        address[] chainOfCustody;
        bool isFinalized;
        address manufacturerAddress;
    }

    event ProductAdded(string indexed productId, address manufacturer);
    event ProductHolderChanged(string indexed productId, address newHolder);
    event ProductTransferred(string indexed productId, address previousHolder, address newHolder);
    event ProductFinalized(string indexed productId, address indexed finalizer);


    /*
     * maps productId to Product
     */
    mapping(string => Product) public products;

    /*
     * @param productId 
     * @param name 
     * @param manufacturer 
     * emits ProductAdded event
     */
    function addProduct(string memory productId, string memory name, string memory manufacturer) public {
        Product storage product = products[productId];
        product.name = name;
        product.manufacturer = manufacturer;
        product.currentHolder = msg.sender;
        product.chainOfCustody.push(msg.sender);
        product.manufacturerAddress = msg.sender;
        product.isFinalized = false;  
        emit ProductAdded(productId, msg.sender);      
    }

    /*
     * @param productId 
     * @param newHolder 
     * emits ProductHolderChanged event
     */
    function alterProductHolder(string memory productId, address newHolder) public{
        Product storage product = products[productId];
        require(msg.sender == product.manufacturerAddress, "Only the manufacturer can update this product");
        product.currentHolder = newHolder;
        product.chainOfCustody.push(product.currentHolder);
        emit ProductHolderChanged(productId, newHolder);
    }

    /*
     * @param productId 
     * @param nextHolder 
     * emits ProductTransferred event
     */
    function transferProduct(string memory productId, address nextHolder) public {
        Product storage product = products[productId];
        require(msg.sender == product.currentHolder, "You are not the current holder of Product");
        require(!product.isFinalized, "Product is finalized and cannot be transferred");
        product.currentHolder = nextHolder;
        product.chainOfCustody.push(nextHolder);
        emit ProductTransferred(productId, msg.sender, nextHolder);
    }

    /*
     * @param productId 
     * emits ProductFinalized event
     */
    function finalizeProduct(string memory productId) public {
        Product storage product = products[productId];
        require(msg.sender == product.currentHolder, "Only the current holder can finalize this product");
        product.isFinalized = true;
        emit ProductFinalized(productId, msg.sender);
    }

    /*
     * @param productId 
     * @return address[] memory
     */
    function getProductChain(string memory productId) public view returns (address[] memory) {
        return products[productId].chainOfCustody;
    }

    /*
     * @param productId 
     * @return string memory
     */
    function getProduct(string memory productId) public view returns (string memory, string memory, address, address[] memory, bool, address) {
        Product storage product = products[productId];
        return (product.name, product.manufacturer, product.currentHolder, product.chainOfCustody, product.isFinalized, product.manufacturerAddress);
    }    
}