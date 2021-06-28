pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SAFEERC20.sol";
import "@chainlink/contracts/src/v0.8/dev/VRFConsumerBase.sol";

/**
 * @title SouSou Contract
 * @dev Main contract for block chain sou sou
 * - Users can:
 *   # Create Sou Sou
 *   # Distribute Payment
 *   # Make Payment
 * @author Dominic Leon Hackett
 */


contract SouSou is VRFConsumerBase  {

    bytes32 internal keyHash;
    uint256 internal fee;
	mapping(bytes32 => uint256) private r_request;
	IERC20 internal usdcToken;
    address USDC_ADDRESS = address(0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e); //Polygon Mumbai USDC contract address
	constructor() 
        VRFConsumerBase(
            0x8C7382F9D8f56b33781fE506E897a4F1e2d17255, // VRF Coordinator
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB  // LINK Token Polygon Mumbai
        ) 
    {
        keyHash = 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4;
        fee = 0.0001 * 10 ** 18; // 0.0001 LINK (Varies by network)
		 usdcToken = IERC20(USDC_ADDRESS);
    }
	 
	
    struct Invite 
	{
	    address person;
		bool accepted;
		bool declined;
		bool isValue;
		string guid;
		uint256 order;
	}
	
	struct Payment 
	{
	  uint256 paymentsMade;  // Count of payments made 
	  bool isValue;
	  bool handPaid;
	  mapping (address => bool) made;  //Shows which members paid 
	 
	}
    
	struct _SouSou 
	{
	   string name;
	   address owner;
	   uint256 dateCreated;
	   uint256 startDate;
	   uint256 numberOfHands;
	   uint256 amount;
	   uint8 distribution;
	   uint256 currentHand;
	   uint256 invites;
	   uint256 acceptedInvites;
	   uint256 declinedInvites;
	   uint256 randomValue;
	   bool acceptingPayment;
	   bool isRandomizing;
       bool distributionsDrawn;
	   mapping (string => Invite) invite;
	   mapping (uint256 => Payment) payments; //Payments by hand.  mapping should eventually contain number of key/pairs equivalent to numberOfHands
	   Invite[] members;
	}
    _SouSou[] sousous;
	
	event CreatedSouSou(address indexed owner,string name,uint256 sousou ,uint256 indexed createdDate,uint256 startDate,uint256 numberOfHands,uint256 amount,uint256 distribution);
    event PaymentMade(address indexed member,uint256 indexed dateMade,uint256 indexed sousou,uint256 amount,uint256 hand);
    event HandPaid(uint256 indexed sousou,address indexed owner ,address member,uint256 amount,uint256 hand,uint256 datePaid);
	event AddInvite(uint256 indexed sousou,address indexed owner,string guid,uint256 dateAdded);
	event InviteAccepted(uint256 indexed sousou,address indexed owner,string guid,uint256 dateAccepted);
	event InviteDeclined(uint256 indexed sousou,address indexed owner,string guid,uint256 dateDeclined);
    event AcceptedInvites(uint256 indexed sousou,address indexed owner,uint256 acceptedInvites,uint256 dateEmitted);
    event DeclinedInvites(uint256 indexed sousou,address indexed owner,uint256 declinedInvites,uint256 dateEmitted);
    event DistributionsDrawn(uint256 indexed sousou,address indexed owner,uint256 dateEmitted);
	event DistributionOrder(uint256 indexed sousou, address indexed owner,address member,uint256 order,uint256 dateEmitted);
	event AcceptingPayment(uint256 indexed sousou, address indexed owner,uint256 dateEmitted,bool isAcceptingPayment,uint256 currentHand);
    

	modifier isValidSouSou (uint256 sousou){
      require(sousou < sousous.length, "Invalid Sou Sous");
   _; 
 }
     modifier isSouSouOwner (uint256 sousou,address owner){
     // require(sousou < sousous.length, "Invalid Sou Sous");
	  require(sousous[sousou].owner == owner,"Not the owner"); 
 
   _; 
 }
 
 
   modifier isValidInvite (uint256 sousou,string memory guid){
     // require(sousou < sousous.length, "Invalid Sou Sous");
	  require(sousous[sousou].invite[guid].isValue == true, "Invalid invite");
   _; 
 }
 
  modifier isMember (uint256 sousou){
     bool member = false;
	 for(uint i =0 ;i < sousous[sousou].members.length;i++)
	 {
	     if(sousous[sousou].members[i].person == msg.sender)
		 {
		    member = true;
			break;
		 }
	 }
	 require(member == true, "You are not a member of this Sou Sou");
 
   _; 
 }  
/**
   * @dev Function is called to Create a Sou Sou
   * @param numberOfHands The of hands or individuals that are allowed to join the sousou.
   * @param amount The amount of money per hand.
   * @param distribution The frequency of distribution weekly.fortnighly, monthly
   * @param startDate The start date of the sou sou
   **/
   function createSouSou(string memory name,uint256 numberOfHands,uint256 amount,uint8 distribution,uint256 startDate) external
   {
      require(startDate > block.timestamp, "Invalid Start Date");
	  require(numberOfHands >= 3, "Invalid Number of Hands");
	  require(amount > 0 ,"Invalid amount");
	  require(distribution >=1 && distribution <= 3 ,"Invalid Distribution");
	  Invite memory  member = Invite(msg.sender,true,false,true,"",0); 
	  
	
	 _SouSou storage sousou =  sousous.push();
	 sousou.name = name;
	 sousou.owner = msg.sender;
	 sousou.dateCreated = block.timestamp;
	 sousou.startDate = startDate;
	 sousou.numberOfHands= numberOfHands;
	 sousou.amount = amount;
     sousou.distribution = distribution;
     sousou.currentHand = 0;
     sousou.members.push(member);    
	 sousou.acceptedInvites = 0;
	 sousou.declinedInvites = 0;
     sousou.randomValue = 0;
	 sousou.acceptingPayment= false;
	 sousou.isRandomizing = false;
     sousou.distributionsDrawn=false;
	 emit CreatedSouSou(msg.sender,name,sousous.length-1,block.timestamp,startDate,numberOfHands,amount,distribution);

	  
   }
   
   
   
   
   
   
   
    /**
   * @dev Function is called to randomly select payout order
   * @param sousou The sousou to make payment towards.
   
   **/
   function orderHandDistribution(uint256 sousou) external isValidSouSou(sousou) isSouSouOwner (sousou,msg.sender)
   {
     // require(sousous[sousou].acceptingPayment == false,"Payout order already done.");
	  //require(sousous[sousou].currentHand == sousous[sousou].numberOfHands, "This Sou Sou is closed");
	  require(sousous[sousou].members.length == sousous[sousou].numberOfHands,"Not enough members"); 
 	  require(sousous[sousou].distributionsDrawn == false,"The draw for distributions has already been done");
	  require(sousous[sousou].isRandomizing == false,"The draw for distributions is not finished");
      require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
	  drawDistributions(sousou);
	  
   }
   
   
   /** 
     * Requests randomness from a user-provided seed
     */
    function drawDistributions(uint256 sousou ) internal isValidSouSou(sousou) isSouSouOwner (sousou,msg.sender) returns (bytes32 requestId) {
	   
	    
        requestId  = requestRandomness(keyHash, fee);
		r_request[requestId] = sousou;
    }
	
	 /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
		for (uint256 i = 0; i < sousous[r_request[requestId]].numberOfHands; i++) {
          sousous[r_request[requestId]].members[i].order = uint256(keccak256(abi.encode(randomness, i)));
    }
		sortDistributions(r_request[requestId]);
		sousous[r_request[requestId]].randomValue = randomness;
		sousous[r_request[requestId]].distributionsDrawn = true;
		sousous[r_request[requestId]].isRandomizing = false;
		sousous[r_request[requestId]].acceptingPayment = true;
		for (uint256 i = 0; i < sousous[r_request[requestId]].numberOfHands; i++) 
	       emit DistributionOrder(r_request[requestId],sousous[r_request[requestId]].owner,sousous[r_request[requestId]].members[i].person,i,block.timestamp);
		emit  DistributionsDrawn(r_request[requestId], sousous[r_request[requestId]].owner,block.timestamp);
	    emit AcceptingPayment(r_request[requestId], sousous[r_request[requestId]].owner,block.timestamp,true,0);

    }
	
	
    function sortDistributions(uint256 sousou) internal 
	{
	
	 uint256 i;
	 uint256 j;
	 Invite memory temp;
	 uint256 n =sousous[sousou].members.length;
    for (i = 0; i < n-1; i++)    
     
    // Last i elements are already in place
    for (j = 0; j < n-i-1; j++)
        if (sousous[sousou].members[j].order > sousous[sousou].members[j+1].order)
		{
		   temp = sousous[sousou].members[j];
		   sousous[sousou].members[j] = sousous[sousou].members[j+1];
		   sousous[sousou].members[j+1] = temp;
		}
	}
	
   
   
   
   
   /**
   * @dev Function is called to make payment
   * @param sousou The sousou to make payment towards.
   **/
   function payContribution(uint256 sousou) external isValidSouSou(sousou) isMember(sousou)
   {
      require(sousous[sousou].payments[sousous[sousou].currentHand].made[msg.sender] == false, "You already made payments to this hand");
  	  require(sousous[sousou].acceptingPayment == true, "Not Accepting Payment at this time");
	  uint256 senderBalanceRequired = sousous[sousou].amount;
	  senderBalanceRequired = senderBalanceRequired* 10**6;
	  require(usdcToken.balanceOf(msg.sender) >= senderBalanceRequired, "Not enough balance");
      usdcToken.transferFrom(msg.sender,address(this), senderBalanceRequired);
	  
	  if(sousous[sousou].payments[sousous[sousou].currentHand].isValue == false)
	  {
	    
        
		//Payment storage newPayment = sousous[sousou].payments[sousous[sousou].currentHand].paymentsMade;
		sousous[sousou].payments[sousous[sousou].currentHand].paymentsMade = 0;
		sousous[sousou].payments[sousous[sousou].currentHand].isValue = true;
		sousous[sousou].payments[sousous[sousou].currentHand].handPaid =false;
		sousous[sousou].payments[sousous[sousou].currentHand].made[msg.sender] = true;
	  }
	  
	  else{
	     sousous[sousou].payments[sousous[sousou].currentHand].made[msg.sender] = true;
	     sousous[sousou].payments[sousous[sousou].currentHand].paymentsMade +=1;
	  }	 
	  
	 PaymentMade(msg.sender,block.timestamp,sousou,sousous[sousou].amount,sousous[sousou].currentHand);
       
   }
   
   /**
   * @dev Function is called to distribute payment to member
   * @param sousou The sousou to make payment towards.
   **/
   function payHand(uint256 sousou) external isValidSouSou(sousou) isSouSouOwner (sousou,msg.sender)
   {
     require( sousous[sousou].payments[sousous[sousou].currentHand].handPaid == false,"Hand already paid.");
	 require( sousous[sousou].payments[sousous[sousou].currentHand].paymentsMade ==  sousous[sousou].numberOfHands,"Can't distribute hand. Outstanding hands still to be paid.");
	 uint256 amount = (sousous[sousou].amount *10**6)*sousous[sousou].numberOfHands;
	 usdcToken.transfer(sousous[sousou].members[sousous[sousou].currentHand].person,amount);
	 sousous[sousou].payments[sousous[sousou].currentHand].handPaid = true;
     emit HandPaid(sousou,sousous[sousou].owner ,sousous[sousou].members[sousous[sousou].currentHand].person,sousous[sousou].amount*sousous[sousou].numberOfHands ,sousous[sousou].currentHand,block.timestamp);
     if(sousous[sousou].currentHand+1 < sousous[sousou].numberOfHands )
	   sousous[sousou].currentHand += 1;

   }
   
   
   /**
   * @dev Function is called to add invite to sousou
   * @param sousou The sousou.
   * @param guid  The guid of the invite
   **/
   function addInvite(uint256 sousou,string memory guid) external isValidSouSou(sousou) isSouSouOwner (sousou,msg.sender)
   {
      require(sousous[sousou].invite[guid].isValue == false ,"Invite already exist");
	  //require(sousous[sousou].invites+1 <= sousous[sousou].numberOfHands,"Maximum invites sent already");
	  //Invite memory invite = Invite(0,false,true,guid);
	 require(sousous[sousou].acceptedInvites < sousous[sousou].numberOfHands,"All slots are already taken");

	  sousous[sousou].invite[guid].accepted= false;
	  sousous[sousou].invite[guid].isValue = true;
	  sousous[sousou].invite[guid].guid =guid;
	   sousous[sousou].invite[guid].order = 0;
	  sousous[sousou].invites+=1;
	  emit AddInvite(sousou,msg.sender,guid,block.timestamp);

	   
		
   }
   
   
   
   /**
   * @dev Function is called to accept invite to sousou
   * @param sousou The sousou.
   * @param guid  The guid of the invite
   **/
   function acceptInvite(uint256 sousou,string memory guid) external isValidSouSou(sousou) isValidInvite(sousou,guid)
   {
         
	 require(sousous[sousou].acceptedInvites < sousous[sousou].numberOfHands,"All slots are already taken");
	 require(sousous[sousou].invite[guid].accepted ==false,"This invite has already been accepted. You cannot accept it.");
	 require(sousous[sousou].invite[guid].declined ==false,"This invite has already been declined. You cannot accept it");

	 sousous[sousou].acceptedInvites +=1;
	 sousous[sousou].invite[guid].person = msg.sender;
	 sousous[sousou].invite[guid].accepted = true;
	 sousous[sousou].members.push(sousous[sousou].invite[guid]);  // add invite as member of sousou
	 emit InviteAccepted(sousou,msg.sender,guid,block.timestamp);
     emit AcceptedInvites(sousou,sousous[sousou].owner,sousous[sousou].acceptedInvites,block.timestamp);

   }

 /**
   * @dev Function is called to decline invite to sousou
   * @param sousou The sousou.
   * @param guid  The guid of the invite
   **/
   function declineInvite(uint256 sousou,string memory guid) external isValidSouSou(sousou) isValidInvite(sousou,guid)
   {
    // require( sousous[sousou].invite[guid].person == msg.sender,"You cannot decline this invite."); 
	 require(sousous[sousou].invite[guid].accepted ==false,"This invite has already been accepted. You cannot accepted it.");
	 require(sousous[sousou].invite[guid].declined ==false,"This invite has already been declined.");

	 sousous[sousou].declinedInvites +=1;

	 sousous[sousou].invite[guid].person = msg.sender;
	 sousous[sousou].invite[guid].declined = true;
	 emit InviteDeclined(sousou,msg.sender,guid,block.timestamp);
     emit DeclinedInvites(sousou,sousous[sousou].owner,sousous[sousou].declinedInvites,block.timestamp);
	 

   }
}