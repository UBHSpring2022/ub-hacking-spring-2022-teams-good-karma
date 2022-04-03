
pragma solidity ^0.6.2;
pragma experimental ABIEncoderV2;
    
contract Kgc  {
   
    address god;
    
    struct order {
        uint barcode;
        uint bought;
        uint delivered;
    }



    struct details{ 
        uint escrow; // local consortium escrow
        uint usertype;
        bool blacklist;

        // Vendor
        uint item_barcode;
        uint item_name;

        // organization
        mapping (uint => order)  orders;
        uint order_count ;
    }

    event GetOrders(order[]);
    event evict(address);

    uint public myBalance; // smart contract balance
    
    mapping (address=>details) public balanceDetails;  // mapping is like hashmap
    mapping(uint => address) public account_list;
    uint  number_of_accounts = 0;

    mapping (address=>uint) membership; 
    
    // modifiers or rules           
    modifier onlyChairperson{           
        require(msg.sender==god);
        _;
    }
    modifier onlyMember{ 
        require(membership[msg.sender]==1);
        _;
    }
     modifier onlyDonar{ 
        require(balanceDetails[msg.sender].usertype==0);
        _;
    }
    modifier onlyOrganization{ 
        require(balanceDetails[msg.sender].usertype==1);
        _;
    }
    // constructor function
    constructor () public payable  { 
      
        god=msg.sender;
        membership[msg.sender]=1; // automatically registered
        balanceDetails[msg.sender].escrow = msg.value;
        balanceDetails[msg.sender].blacklist = false;
        balanceDetails[msg.sender].usertype = 3; // god mod
        myBalance = address(this).balance;

        
    }
    
    function register (uint usertype,uint currentBalance ) public { 
        
        address user_ =msg.sender;
        membership[user_]=1;
        balanceDetails[msg.sender].usertype = usertype;
        balanceDetails[msg.sender].blacklist = false;
        balanceDetails[msg.sender].escrow = currentBalance;
        balanceDetails[msg.sender].order_count = 0;

        account_list[number_of_accounts] = msg.sender;
        number_of_accounts++;

        
    }

    function registerVendor ( uint barcode) public { 
        
        address AirlineA =msg.sender;
        membership[AirlineA]=1;
        balanceDetails[msg.sender].usertype = 2;
        balanceDetails[msg.sender].blacklist = false;
        balanceDetails[msg.sender].escrow = 0;
        balanceDetails[msg.sender].order_count = 0;
        balanceDetails[msg.sender].item_barcode = barcode;

        
    }


        
   function unregister (address payable AirlineZ) onlyChairperson public {
        
        /*if(chairperson!=msg.sender){
            revert();
        }*/
        if (membership[AirlineZ]!= 1){ revert();}
        
        membership[AirlineZ]=0;
        // return escrow to leaving airline: other conditions may be verified
        AirlineZ.transfer(balanceDetails[AirlineZ].escrow);
        balanceDetails[AirlineZ].escrow = 0;
        
    }
    
    
    
     
function donate  (address payable toOrganization) onlyMember   onlyDonar payable public{ 
        
        if (balanceDetails[toOrganization].blacklist ){ 
            
            revert("You cannot donate to blacklisted organization");
        }

        address fromDonar=msg.sender;
        uint amt = msg.value;
        
        // this is the consortium account transfer you want to do
        balanceDetails[toOrganization].escrow = balanceDetails[toOrganization].escrow + amt;
        balanceDetails[fromDonar].escrow= balanceDetails[fromDonar].escrow - amt;
       
       // amt subtrated from msg.sender and given to toAirline
        toOrganization.transfer(amt); 
        
    }
    
     
function buy  (address payable toVendor, uint number_items) onlyMember  onlyOrganization payable public{ 
        
  if (balanceDetails[msg.sender].blacklist ){ 
            
            revert("You cannot perform transaction");
        }


        address fromOrg=msg.sender;
        uint amt = msg.value;
        
        // this is the consortium account transfer you want to do
        balanceDetails[toVendor].escrow = balanceDetails[toVendor].escrow + amt;
        balanceDetails[fromOrg].escrow= balanceDetails[fromOrg].escrow - amt;


        // Find if the barcode already exists


        uint barcode =  balanceDetails[toVendor].item_barcode;
        for(uint i=0; i < balanceDetails[fromOrg].order_count; i++ ){
            if(balanceDetails[fromOrg].orders[i].barcode ==  barcode) {
                balanceDetails[fromOrg].orders[i].bought+=number_items;
                 toVendor.transfer(amt); 
                 return;
            }
        }

       
        balanceDetails[fromOrg].orders[balanceDetails[fromOrg].order_count].barcode = barcode;
        balanceDetails[fromOrg].orders[balanceDetails[fromOrg].order_count].bought = number_items;
        balanceDetails[fromOrg].order_count++;

       // amt subtrated from msg.sender and given to toAirline
        toVendor.transfer(amt); 
        
    }
    
    
function validate  (address  org, uint barcode , uint number_items) onlyMember  onlyChairperson  public{ 
        
   
        // Find if the barcode already exists

        for(uint i=0; i < balanceDetails[org].order_count; i++ ){
            if(balanceDetails[org].orders[i].barcode ==  barcode) {
                balanceDetails[org].orders[i].delivered+=number_items;
                 return;
            }
        }

        
    }

    
function getOrders  () onlyMember  onlyOrganization public  returns  (order[] memory)  { 



        order[] memory orders =   new order[](balanceDetails[msg.sender].order_count);
   
        // Find if the barcode already exists

        for(uint i=0; i < balanceDetails[msg.sender].order_count; i++ ){
           orders[i] =  balanceDetails[msg.sender].orders[i];
        }
    emit GetOrders(orders);
        return orders;
    }

function validateOrg() onlyOrganization public{
    
    address fromOrg=msg.sender;

    uint totalBought = 0;
    uint totalDelivered = 0;

    for(uint i=0; i < balanceDetails[fromOrg].order_count; i++ ){
           totalBought+=  balanceDetails[fromOrg].orders[i].bought;
           totalDelivered+=  balanceDetails[fromOrg].orders[i].delivered;
        }


    uint score = totalDelivered * 100 /totalBought;

    if(score < 70){
        balanceDetails[fromOrg].blacklist = true;
        emit evict(fromOrg);
        }





}

function getGod() public returns (address) {
    return god;
}

function getNumberOfAccount() public returns (uint) {
    return number_of_accounts;
}

function getAccountList() payable public returns (address[] memory) {
     address[] memory accounts =   new address[](number_of_accounts);
     for(uint i=0; i < number_of_accounts; i++ ){
           accounts[i] =  account_list[i];
        }
        return accounts;
}

}