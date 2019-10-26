import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { GridLayout, GridUnitType, ItemSpec } from "tns-core-modules/ui/layouts/grid-layout";
import { Color } from "tns-core-modules/color";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { UsersfollowService } from "../shared/api/usersfollow/usersfollow.service";
import { Usersfollowextend } from "../shared/models/usersfollowextend.model";
import { TabView, TabViewItem, SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";
import { User } from "../shared/models/user.model";
import { localize } from "nativescript-localize";
import { Data } from "../providers/data/data";
import * as localstorage from "nativescript-localstorage";
import { Label } from "tns-core-modules/ui/label";
import { Image } from "tns-core-modules/ui/image";
import { UsersinterestsService } from "../shared/api/usersinterests/usersinterests.service";
import { Usersinterests } from "../shared/models/usersinterests.model";
import { Button } from "tns-core-modules/ui/button";
import { GestureEventData, GestureTypes } from "tns-core-modules/ui/gestures";
import { UsersdealsService } from "../shared/api/usersdeals/usersdeals.service";
import { Usersdeals } from "../shared/models/usersdeals.model";
import { RouterExtensions } from "nativescript-angular/router";
import { Usersfollow } from "../shared/models/usersfollow.model";
import { UserapiService } from "../shared/api/user/userapi.service";
import { ScrollView } from "tns-core-modules/ui/scroll-view";
import { ActivatedRoute } from "@angular/router";
// 
import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";


@Component({
  selector: 'ns-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css'],
  moduleId: module.id,
})
export class FollowerComponent implements OnInit {

	@ViewChild("myNgStack", {static: false}) stackRef: ElementRef;
	myNativeStack: TabView;

	@ViewChild("myNgStackUsers", {static: false}) stackRefUsers: ElementRef;
	myNativeStackUsers: GridLayout;	

	mainUserSaveIdentification: string = "";
	userIdentification: string = "";
	// labelfollowbutton: string;
	userLoginRecordUser: User;
	userLoginRecordComplete: any;
    // responseUsersFollow: Usersfollow[];

	dataUser: any;

	dataInterest: any;

	constructor(private usersfollowService: UsersfollowService,
  		        private usersinterestsService: UsersinterestsService,
  		        private data: Data,
  		        private ngZone: NgZone,
  		        private usersdealsService: UsersdealsService,
  		        private _routerExtensions: RouterExtensions,
  		        private userApiService: UserapiService,
  		        private route: ActivatedRoute) { 

		// this.page.actionBarHidden = true;

	    this.route.queryParams.subscribe(params => {
	        this.userIdentification = params["idUserSearched"];
	        // this.dataUser = JSON.parse(params["dataUser"]);
	        // this.dataInterest = JSON.parse(params["dataInterest"]);
	    });

		// console.log("dataUser " + JSON.stringify(this.dataUser));
		// console.log("dataInterest " + JSON.stringify(this.dataInterest));	    

	}

	ngOnInit() {

		this.myNativeStack = this.stackRef.nativeElement;

		this.myNativeStackUsers = this.stackRefUsers.nativeElement;


	    if(localstorage.getItem('ResultLogin') != null){
            let userLoginRecord = JSON.parse(localstorage.getItem('ResultLogin'));
            this.userLoginRecordComplete = userLoginRecord;
            this.userLoginRecordUser = userLoginRecord.info;
            if(this.userIdentification == null || this.userIdentification == ""){
        		this.userIdentification = userLoginRecord.info._id;
            }
            this.mainUserSaveIdentification = userLoginRecord.info._id;
        }		

		const newGridLayout = new GridLayout();

		this.viewUsersFollowers(newGridLayout);

	}


	public viewUsersFollowers(newGridLayout){

		console.log("Identificacion de usuario " + this.userIdentification);


		this.getAllFollowersUsers(this.userIdentification).then(allUsersFollowers => {

	  		allUsersFollowers.forEach( async (elementRecord, index) => {

	  			// console.log("Registro allUsersFollowers" + JSON.stringify(elementRecord));

				//verificar si usuario es seguido o no para colocar label
				// this.verifyFollow(elementRecord.userid._id);


			  	this.isFollower(this.mainUserSaveIdentification, elementRecord.userid._id).then(dataIsFollow => {

					console.log("Verify IsFollower mainUserSaveIdentification " + this.mainUserSaveIdentification);

					console.log("Verify IsFollower elementRecord.userid._id " + elementRecord.userid._id);			  		
			  		
		  			console.log("Response IsFollower " + JSON.stringify(dataIsFollow));

			        var responseUsersFollow = dataIsFollow;

			        console.log("iFollower" + JSON.stringify(responseUsersFollow));

			        var labelfollowbutton = "";

			        if(responseUsersFollow.length>0){
			            if(responseUsersFollow[0].status == false){
			              labelfollowbutton = "follow";

			            }else if(responseUsersFollow[0].status == true){
			              labelfollowbutton = "unfollow";
			            }            	
			        }else{
			        	labelfollowbutton = "follow";
			        }		
			        		

					console.log("Valor isFollower " + labelfollowbutton)

		  			var contadorRow = index;

					this.getInterestsByUsers(elementRecord.userid._id).then(interestsUserFollower => {	  					

			  			// StackLayout para imagen 
			  			const stackLayoutImage = new StackLayout();
				        stackLayoutImage.marginTop = 10;
				        stackLayoutImage.marginLeft = 36;
				        stackLayoutImage.marginRight = 36;
				        stackLayoutImage.horizontalAlignment = "left";		      

						// Imagen de perfil	
						const newImage = new Image();          
						newImage.src = elementRecord.userid.picturehome;
						newImage.stretch = "fill";
						newImage.style.width = 55;
						newImage.style.height = 55;
						newImage.style.borderRadius = 61;
						stackLayoutImage.addChild(newImage);

						// StackLayout para nombre de usuaario
						const newStackLayoutLabel = new StackLayout();
						newStackLayoutLabel.horizontalAlignment = "left";            
						newStackLayoutLabel.height = 75;
						newStackLayoutLabel.marginTop = 15;
						newStackLayoutLabel.marginLeft = 104;                                            

						// Nombre de usuario
						const newLabel = new Label();          
						newLabel.text = elementRecord.userid.name;
						// newLabel.className = "label-search";
						newLabel.style.fontFamily = "SFProDisplay-Medium";
						newLabel.style.fontSize = 12;
						newLabel.style.fontWeight = "bold" ;
						newStackLayoutLabel.addChild(newLabel);

						// StackLayout para boton
						const newStackLayoutButton = new StackLayout(); 
						newStackLayoutButton.height = 30;
						newStackLayoutButton.marginLeft = 270;
				        newStackLayoutButton.marginRight = 36;						                                            

						// boton
						const button = new Label();     
						button.id = elementRecord.userid._id;     
						// button.text = localize("following");
						button.text = localize(labelfollowbutton);
						button.backgroundColor = new Color("#EE185F");
						button.height = 25;
						button.width = 75;
						button.color = new Color("white");
						button.style.fontFamily = "SFProDisplay-Bold";
						button.style.fontSize = 12;
						button.style.fontWeight = "bold" ;					
						button.textAlignment = "center"
						button.borderRadius = 8;
						button.on("tap", ( data ) => {

							let tagButton = <Button>data.object;
							this.onClickFollow(elementRecord, tagButton, responseUsersFollow);
						});
			  			if(this.mainUserSaveIdentification == elementRecord.userid._id)
			  			{
			  				newStackLayoutButton.visibility="collapse";
			  			}else{
			  				newStackLayoutButton.visibility="visible";
			  				
			  			}
						newStackLayoutButton.addChild(button);	


		                // GridLayout para city label
		                const newGridLayout1 = new GridLayout();          
		                newGridLayout1.backgroundColor = new Color("white");                  
		                newGridLayout1.height = 25;                  
		                newGridLayout1.marginLeft = 104;	

						// city
						const newLabelCity = new Label();          
						newLabelCity.text = elementRecord.userid.city;
						// newLabel.className = "label-search";
						newLabelCity.style.fontFamily = "SFProDisplay-Medium";
						newLabelCity.style.fontSize = 12;
						newLabelCity.style.color = new Color("black");
		                newGridLayout1.addChild(newLabelCity);					

						// var contadorCol = 0;

						// // Imagen de intereses de cada usuario seguido
		    //           	interestsUserFollower.forEach( async interestsRecord => {

						// 	// StackLayout para imagen de tipo de local
						// 	const newStackLayoutIcon = new StackLayout();
						// 	newStackLayoutIcon.style.backgroundColor = new Color("#d9d6e1");
						// 	newStackLayoutIcon.width = 21;
						// 	newStackLayoutIcon.height = 21;
						// 	newStackLayoutIcon.style.borderRadius = 4;
						// 	// this.newStackLayoutIcon.marginTop = 25;
						// 	// this.newStackLayoutIcon.marginLeft = 104;
						// 	newStackLayoutIcon.horizontalAlignment = "left";
						// 	newStackLayoutIcon.verticalAlignment = "middle";

						// 	const newImageIcon = new Image();          
						// 	newImageIcon.src = "res://" + interestsRecord.typeid.icontype;
						// 	newImageIcon.stretch = "fill";
						// 	newImageIcon.style.width = 8;
						// 	newImageIcon.style.height = 14;
						// 	newImageIcon.style.borderRadius = 4;
						// 	newStackLayoutIcon.addChild(newImageIcon);
						// 	newGridLayout1.addChildAtCell(newStackLayoutIcon, index , contadorCol);  
						// 	newGridLayout1.addColumn(new ItemSpec(28, GridUnitType.PIXEL)); 
						// 	contadorCol = contadorCol + 1;

		    //           	});					

						// Stacklayout para filas									        
						const gridLayoutMain = new GridLayout();
						gridLayoutMain.height=75;
						gridLayoutMain.width=273;
						gridLayoutMain.horizontalAlignment = "left";
						gridLayoutMain.id = elementRecord.userid._id;
						gridLayoutMain.addChildAtCell(stackLayoutImage, 0, 0);
						gridLayoutMain.addChildAtCell(newStackLayoutLabel, 0, 0);
						gridLayoutMain.addChildAtCell(newGridLayout1, 0, 0);
						// gridLayoutMain.addChildAtCell(newStackLayoutButton, 0, 0);						
						gridLayoutMain.addRow(new ItemSpec(0, GridUnitType.AUTO));
						//Event to click user profile
						gridLayoutMain.on(GestureTypes.tap, (args: GestureEventData ) => { 

			                let grid = <GridLayout>args.object;           
			                let json_user_selected: any = allUsersFollowers.filter(d => d.userid._id === grid.id);
			                let intereses: any = [];
			                let subIntereses: any = {};

			                this.data.storage_varb = json_user_selected[0].userid;

			                // Obtener intereses de usuario selecionado
							this.getInterestsByUsers(grid.id).then(interestsUserSelected => {

								interestsUserSelected.forEach(async itemInterest =>{
				                  subIntereses = {};
				                  subIntereses.id =  itemInterest.typeid._id       
				                  subIntereses.img = itemInterest.typeid.icontype;
				                  subIntereses.width = "10.9";
				                  subIntereses.height = "18";
				                  intereses.push(subIntereses);      
								});

				                this.data.storage_vara = intereses;

				                this.getDealsSubscribe(json_user_selected[0].userid._id).then(dealsResponse => {
				                  this.data.storage_varc = dealsResponse;
				                  this.ngZone.run(() => this._routerExtensions.navigate(['profilevisited'])).then();
				                });                      

							});	
			                                      
		              	});	 
		              	
						// Agrega al GridLayout principal
						console.log("ii " + contadorRow);
						newGridLayout.addChildAtCell(gridLayoutMain, contadorRow, 0);
						newGridLayout.addChildAtCell(newStackLayoutButton, contadorRow, 0);
						newGridLayout.addRow(new ItemSpec(0, GridUnitType.AUTO));
	             	

					});

				});//fin verifica isFollower

	  		}); //fin forEach
			
				
				// ScrollView
				const newScroll = new ScrollView();
				// newScroll.scrollBarIndicatorVisible = false;
				newScroll.orientation="vertical";
				// newScroll.backgroundColor=new Color("#E8E6E6");
				// newScroll.height=200;          
				newScroll.content = newGridLayout;

		  		// StackLayout de contenido para TAB users
				const stackLayoutUsers = new StackLayout();
				stackLayoutUsers.addChild(newScroll);

				// Crear TAB Users
				const tabViewUsers = new SegmentedBarItem();
				tabViewUsers.title = localize("users");
				// tabViewUsers.view = stackLayoutUsers;
				this.myNativeStackUsers.addChild(stackLayoutUsers);
				this.myNativeStackUsers.visibility = "visible";				

				const items = [];
				items.push(tabViewUsers);

				// Set TABS en TabView principal			
				this.myNativeStack.items = items;
				this.myNativeStack.style.fontFamily = "SFProDisplay-Light";
				this.myNativeStack.style.fontSize = 15;
				this.myNativeStack.selectedIndex = 0;				
				this.myNativeStack.on("selectedIndexChange", ( sbargs: SelectedIndexChangedEventData ) => {
					let indexTab = (<SegmentedBar>sbargs.object).selectedIndex;
					console.log("INDEX TAB ******* " + indexTab);
				});				

		});

	}

    public goBackProfile() {

    	if(this.dataUser == null && this.dataInterest == null ){

	        let jsonuseraux = "";
	        let jsonDataUser: any;
	        jsonuseraux = localstorage.getItem('ResultLogin');

	        if( jsonuseraux == null)
	            this._routerExtensions.navigate(["login"], {animated: false});
	        else{
	            this.getDealsSubscribe(this.userIdentification).then(dealsResponse => {
	                this.data.storage_vara = dealsResponse;
	                this._routerExtensions.navigate(["profile"], {animated: false});                            

	            });

	        }

    	}else{

	    	this.data.storage_varb = this.dataUser;
	    	this.data.storage_vara = this.dataInterest;    	
	        this.getDealsSubscribe(this.userIdentification).then(dealsResponse => {
	            this.data.storage_varc = dealsResponse;
	            this._routerExtensions.navigate(["profilevisited"], 
	            	{
	        			animated:true,
	                	transition: {
	                    	name: "slideRight"
	                    	// duration: 2000,
	                    	// curve: "linear"
	                    }
	                });                            

	        });

    	}


        // let jsonuseraux = "";
        // let jsonDataUser: any;
        // jsonuseraux = localstorage.getItem('ResultLogin');

        // if( jsonuseraux == null)
        //     this._routerExtensions.navigate(["login"], {animated: false});
        // else{
        //     this.getDealsSubscribe(this.userIdentification).then(dealsResponse => {
        //         this.data.storage_vara = dealsResponse;
        //         this._routerExtensions.navigate(["profile"], {animated: false});                            

        //     });

        // }    	
    }	

	onClickFollow(elementRecord, tagButton, responseUsersFollow){

		console.log("Registro elementRecord " + JSON.stringify(elementRecord));

	    let objectUpdateUser = {} as User;
	    let objectUpdateUserVisited = {} as User;    
	    let objectUpdateFollowers = {} as Usersfollow;

	    if(responseUsersFollow.length == 0){
	    	console.log("responseUsersFollow == 0" + JSON.stringify(responseUsersFollow));
			// this.labelfollowbutton = localize("unfollow");
			tagButton.text = localize("unfollow");
			objectUpdateUser.following = this.userLoginRecordUser.following + 1;
			objectUpdateUserVisited.followers = elementRecord.userid.followers + 1;
			//save table usersfollow
			// objectUpdateFollowers.userid = this.userIdentification;
			objectUpdateFollowers.userid = this.mainUserSaveIdentification;			
			objectUpdateFollowers.useridfollow = elementRecord.userid._id;
			objectUpdateFollowers.status = true;

			console.log("Objeto a guardar " + JSON.stringify(objectUpdateFollowers));

			this.postUserFollower(objectUpdateFollowers).then(dataResponse => {
				console.log("Save User_User " + JSON.stringify(dataResponse));
				responseUsersFollow = [];
				responseUsersFollow.push(dataResponse);
			});
	    }else if(responseUsersFollow[0].status == false){
			tagButton.text = localize("unfollow");
			console.log("status == false" + JSON.stringify(responseUsersFollow));
	      	// this.labelfollowbutton = localize("unfollow");
			objectUpdateUser.following = this.userLoginRecordUser.following + 1;
			objectUpdateUserVisited.followers = elementRecord.userid.followers + 1;
			//update table users_markers
			objectUpdateFollowers.status = true;
			this.putUserFollower(this.mainUserSaveIdentification, elementRecord.userid._id, objectUpdateFollowers).then(dataResponse => {
				console.log("Update User_User " + JSON.stringify(dataResponse));
				responseUsersFollow[0].status = dataResponse.status;
			});      
	    }else if(responseUsersFollow[0].status == true){
    	  console.log("status == true" + JSON.stringify(responseUsersFollow));
	      tagButton.text = localize("follow");
	      // this.labelfollowbutton = localize("follow");
	      objectUpdateUser.following = this.userLoginRecordUser.following - 1;
	      objectUpdateUserVisited.followers = elementRecord.userid.followers - 1;
	      //update table users_markers
	      objectUpdateFollowers.status = false;
	      this.putUserFollower(this.mainUserSaveIdentification, elementRecord.userid._id, objectUpdateFollowers).then(dataResponse => {
	        console.log("Update User_Marker " + JSON.stringify(dataResponse));
	        responseUsersFollow[0].status = dataResponse.status;
	      });
	    }

	    this.putUserFinalFollower(this.userLoginRecordUser._id, objectUpdateUser).then(dataResponse => {
	      	this.userLoginRecordComplete.info.following = dataResponse.following
	  	    localStorage.removeItem('ResultLogin');
			localstorage.setItem('ResultLogin', JSON.stringify(this.userLoginRecordComplete));
	      	// console.log(this.userLoginRecordUser);
		    this.putUserFinalFollower(elementRecord.userid._id, objectUpdateUserVisited).then(dataResponseAux => {
		      //****** check this.userLogData.followers = dataResponseAux.followers;

		    });                  

	    });


	}    

    async getAllFollowersUsers(userid) {

        try {
        	/* 
        	* return Usersfollow: any
        	*/
            const followingRecordsUsers: any[] = await this.usersfollowService.getFollowersRecords(userid);            
            return followingRecordsUsers;
        } catch(err) {
            console.log(err);
        }
        
    }    

    async getInterestsByUsers(idUser: string) {

      try {
      	/*
      	* Usersinterests: any
      	*/
          // const user_type: Usersinterests[] = await this.usersinterestsService.getTypesFullFromUsers(idUser);
          const user_type: any[] = await this.usersinterestsService.getTypesFullFromUsers(idUser);          
          return user_type;
      } catch(err) {
          console.log(err);
      }
      
    }

    async getDealsSubscribe(userId: string) {

      try {
          const users_deals: any = await this.usersdealsService.getAllDealsSubscribe(userId);
          return users_deals;
      } catch(err) {
          console.log(err);
      }
      
    }    

    async isFollower(userid, useridfollow) {

        try {
            const countRecords: Usersfollow[] = await this.usersfollowService.getRecordFollow(userid, useridfollow);
            return countRecords;
        } catch(err) {
            console.log(err);
        }
        
    }  

    async postUserFollower(objectUpdate: Usersfollow) {

        try {
            const user_profile: Usersfollow = await this.usersfollowService.saveFollowersUser(objectUpdate);
            // var dealsprofilecontent: any = JSON.parse(deals_profile); 
            return user_profile;
        } catch(err) {
            console.log(err);
        }
        
    } 

    async putUserFollower(userid, useridfollow, objectUpdate: Usersfollow) {

        try {
            const user_profile: Usersfollow = await this.usersfollowService.updateFollowersUser(userid, useridfollow, objectUpdate);
            // var dealsprofilecontent: any = JSON.parse(deals_profile); 
            return user_profile;
        } catch(err) {
            console.log(err);
        }
        
    }

    async putUserFinalFollower(userid, objectUpdate: User) {

        try {
            const user_profile: User = await this.userApiService.updateUser(userid, objectUpdate);
            // var dealsprofilecontent: any = JSON.parse(deals_profile); 
            return user_profile;
        } catch(err) {
            console.log(err);
        }
        
    }              

}
