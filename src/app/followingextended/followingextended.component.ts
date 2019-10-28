import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { GridLayout, GridUnitType, ItemSpec } from "tns-core-modules/ui/layouts/grid-layout";
import { Color } from "tns-core-modules/color";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { ImagesService } from "../shared/api/images/images.service";
import { UsersfollowService } from "../shared/api/usersfollow/usersfollow.service";
import { Usersfollowextend } from "../shared/models/usersfollowextend.model";
import { TabView, TabViewItem, SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";
import { Label } from "tns-core-modules/ui/label";
import { Image } from "tns-core-modules/ui/image";
import { UsersinterestsService } from "../shared/api/usersinterests/usersinterests.service";
import { Usersinterests } from "../shared/models/usersinterests.model";
import { Button } from "tns-core-modules/ui/button";
import { localize } from "nativescript-localize";
import { Data } from "../providers/data/data";
import { GestureEventData, GestureTypes } from "tns-core-modules/ui/gestures";
import { UsersdealsService } from "../shared/api/usersdeals/usersdeals.service";
import { Usersdeals } from "../shared/models/usersdeals.model";
import { RouterExtensions } from "nativescript-angular/router";
import { Usersfollow } from "../shared/models/usersfollow.model";
import { User } from "../shared/models/user.model";
import { UserapiService } from "../shared/api/user/userapi.service";
import * as localstorage from "nativescript-localstorage";
import { Page } from "tns-core-modules/ui/page";
import { ImageSource, fromBase64, fromFile } from "tns-core-modules/image-source";
import { UsersmarkerService } from "../shared/api/usersmarker/usersmarker.service";
import { Usersmarker } from "../shared/models/usersmarker.model";
import { Usersmarkerextend } from "../shared/models/usersmarkerextend.model";
import { Markerprofile } from "../shared/models/markerprofile.model";
import { MarkerprofileService } from "../shared/api/markerprofile/markerprofile.service";
import { ScrollView } from "tns-core-modules/ui/scroll-view";
import { ActivatedRoute } from "@angular/router";
// 
import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";



@Component({
  selector: 'ns-followingextended',
  templateUrl: './followingextended.component.html',
  styleUrls: ['./followingextended.component.css'],
  moduleId: module.id,
})
export class FollowingextendedComponent implements OnInit {

	@ViewChild("myNgStack", {static: false}) stackRef: ElementRef;
	myNativeStack: SegmentedBar;

	@ViewChild("myNgStackUsers", {static: false}) stackRefUsers: ElementRef;
	myNativeStackUsers: GridLayout;

	@ViewChild("myNgStackShops", {static: false}) stackRefShops: ElementRef;
	myNativeStackShops: GridLayout;		

	mainUserSaveIdentification: string = "";

	userIdentification: string = "";

	userLoginRecordUser: User;

	userLoginRecordComplete: any;

	dataUser: any;

	dataInterest: any;

	// responseUsersFollow: Usersfollow[];

  	// responseUsersMarker: Usersmarker[];	

	constructor(private imagesService: ImagesService,
  		        private usersfollowService: UsersfollowService,
  		        private usersmarkerService: UsersmarkerService,
  		        private usersinterestsService: UsersinterestsService,
  		        private data: Data,
  		        private ngZone: NgZone,
  		        private usersdealsService: UsersdealsService,
  		        private _routerExtensions: RouterExtensions,
  		        private userApiService: UserapiService,
  		        private page: Page,
  		        private markerprofileService: MarkerprofileService,
  		        private route: ActivatedRoute) { 

		var dataUserAux = "";

		var dataInterestAux = "";	


		// this.page.actionBarHidden = true;
	    this.route.queryParams.subscribe(params => {
	        this.userIdentification = params["idUserSearched"];
	        // dataUserAux = params["dataUser"];
	        // dataInterestAux = params["dataInterest"];
	    });

	  //   if(dataUserAux != null && dataInterestAux != null){
   //  		this.dataUser = JSON.parse(dataUserAux);
   //  		this.dataInterest = JSON.parse(dataInterestAux);

	  //   }else{
			// console.log("dataUser vacio");
			// console.log("dataInterest vacio");	    		    	
	  //   }


	  //   else
	  //   {

	  //   }






	}

    ngAfterViewInit() {

		this.myNativeStack = this.stackRef.nativeElement;

		this.myNativeStackUsers = this.stackRefUsers.nativeElement;

		this.myNativeStackShops = this.stackRefShops.nativeElement;

		const newGridLayout = new GridLayout();			

	  	this.getAllFollowingUsers(this.userIdentification).then(allUsersFollowing => {	  		

		  		// var contadorRow = 0;

		  		
		  		allUsersFollowing.forEach( async (elementRecord, index) => {
					

				  	this.isFollower(this.mainUserSaveIdentification, elementRecord.useridfollow._id).then(dataIsFollow => {

				  		console.log("Registro allUsersFollowers" + JSON.stringify(elementRecord));

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
			  			

						this.getInterestsByUsers(elementRecord.useridfollow._id).then(interestsUserFollowing => {	

				  			// StackLayout para imagen 
				  			const stackLayoutImage = new StackLayout();
					        stackLayoutImage.marginTop = 10;
					        stackLayoutImage.marginLeft = 36;
					        stackLayoutImage.marginRight = 36;
					        stackLayoutImage.horizontalAlignment = "left";		      

							// Imagen de perfil	
							const newImage = new Image();          
							newImage.src = elementRecord.useridfollow.picturehome;
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
							newLabel.text = elementRecord.useridfollow.name;
							newLabel.style.fontFamily = "SFProDisplay-Medium";
							newLabel.style.fontSize = 12;
							newLabel.style.fontWeight = "bold" ;
							newStackLayoutLabel.addChild(newLabel);

							// StackLayout para boton
							const newStackLayoutButton = new StackLayout(); 
							newStackLayoutButton.height = 30;
							newStackLayoutButton.marginLeft = 270;
					        newStackLayoutButton.marginRight = 36;	

				  	// 		if(this.flagView==true){
							// 	//verificar si usuario es seguido o no para colocar label
							// 	// labelfollowbutton = this.verifyFollow(elementRecord.userid._id);
							// 	labelfollowbutton = this.verifyFollow(elementRecordUseridId);
							// }else{
							// 	labelfollowbutton = "following";
							// }

							// boton
							const button = new Label();     
							button.id = elementRecord.useridfollow._id;     
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
				  			if(this.mainUserSaveIdentification == elementRecord.useridfollow._id)
				  			{
				  				newStackLayoutButton.visibility="collapse";
				  			}else{
				  				newStackLayoutButton.visibility="visible";

				  			}
							newStackLayoutButton.addChild(button);	


			                // GridLayout para interesrs
			                const newGridLayout1 = new GridLayout();          
			                newGridLayout1.backgroundColor = new Color("white");                  
			                newGridLayout1.height = 25;                  
			                newGridLayout1.marginLeft = 104;	


							const newLabelCity = new Label();          
							newLabelCity.text = elementRecord.useridfollow.city;
							newLabelCity.style.fontFamily = "SFProDisplay-Medium";
							newLabelCity.style.fontSize = 12;
							newLabelCity.style.color = new Color("black");
							newGridLayout1.addChild(newLabelCity);			                					

							// var contadorCol = 0;

			    //           	// Imagen de intereses de cada usuario seguido
			    //           	interestsUserFollowing.forEach( async interestsRecord => {

							// 		// StackLayout para imagen de tipo de local
							// 		const newStackLayoutIcon = new StackLayout();
							// 		newStackLayoutIcon.style.backgroundColor = new Color("#d9d6e1");
							// 		newStackLayoutIcon.width = 21;
							// 		newStackLayoutIcon.height = 21;
							// 		newStackLayoutIcon.style.borderRadius = 4;
							// 		// this.newStackLayoutIcon.marginTop = 25;
							// 		// this.newStackLayoutIcon.marginLeft = 104;
							// 		newStackLayoutIcon.horizontalAlignment = "left";
							// 		newStackLayoutIcon.verticalAlignment = "middle";

							// 		const newImageIcon = new Image();          
							// 		newImageIcon.src = "res://" + interestsRecord.typeid.icontype;
							// 		newImageIcon.stretch = "fill";
							// 		newImageIcon.style.width = 8;
							// 		newImageIcon.style.height = 14;
							// 		newImageIcon.style.borderRadius = 4;
							// 		newStackLayoutIcon.addChild(newImageIcon);
							// 		newGridLayout1.addChildAtCell(newStackLayoutIcon, index , contadorCol);  
							// 		newGridLayout1.addColumn(new ItemSpec(28, GridUnitType.PIXEL)); 
							// 		contadorCol = contadorCol + 1;

				   //            });

							// Stacklayout para filas									        
							const gridLayoutMain = new GridLayout();
							gridLayoutMain.height=75;
							gridLayoutMain.width=273;
							gridLayoutMain.horizontalAlignment = "left";
							gridLayoutMain.id = elementRecord.useridfollow._id;
							gridLayoutMain.addChildAtCell(stackLayoutImage, 0, 0);
							gridLayoutMain.addChildAtCell(newStackLayoutLabel, 0, 0);
							gridLayoutMain.addChildAtCell(newGridLayout1, 0, 0);
							// gridLayoutMain.addChildAtCell(newStackLayoutButton, 0, 0);						
							gridLayoutMain.addRow(new ItemSpec(0, GridUnitType.AUTO));
							//Event to click user profile
							gridLayoutMain.on(GestureTypes.tap, (args: GestureEventData ) => { 

				                let grid = <GridLayout>args.object;           
				                let json_user_selected: any = allUsersFollowing.filter(d => d.useridfollow._id === grid.id);
				                let intereses: any = [];
				                let subIntereses: any = {};

				                this.data.storage_varb = json_user_selected[0].useridfollow;

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

					                this.getDealsSubscribe(json_user_selected[0].useridfollow._id).then(dealsResponse => {
					                  this.data.storage_varc = dealsResponse;
					                  this.ngZone.run(() => this._routerExtensions.navigate(['profilevisited'])).then();
					                });                      

								});	
				                                      
				              });             						


							// Agrega al GridLayout principal
							console.log("ii " + contadorRow);
							// newGridLayout.height=75;
							newGridLayout.addChildAtCell(gridLayoutMain, contadorRow, 0);
							newGridLayout.addChildAtCell(newStackLayoutButton, contadorRow, 0);
							newGridLayout.addRow(new ItemSpec(0, GridUnitType.AUTO));
							
							// contadorRow = contadorRow + 1;
						});

					});

				}); // Fin for each

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

				/*
				* Proceso para obtener los shops
				*
				*/

				const newGridLayoutS = new GridLayout();
				this.viewShopsFollowing(newGridLayoutS);


				// ScrollView
				const newScrollShops = new ScrollView();
				// newScroll.scrollBarIndicatorVisible = false;
				newScrollShops.orientation="vertical";
				// newScroll.backgroundColor=new Color("#E8E6E6");
				// newScroll.height=200;          
				newScrollShops.content = newGridLayoutS;

				// StackLayout de contenido para TAB shops
				const stackLayoutShops = new StackLayout();
				stackLayoutShops.addChild(newScrollShops);

				// Crear TAB Users
				const tabViewUsers = new SegmentedBarItem();
				tabViewUsers.title = localize("users");;
				// tabViewUsers.view = stackLayoutUsers;
				this.myNativeStackUsers.addChild(stackLayoutUsers);
				this.myNativeStackUsers.visibility = "visible";				


				// Crear TAB Shops
				const tabViewShops = new SegmentedBarItem();
				tabViewShops.title = localize("shops");;
				// tabViewShops.view = stackLayoutShops;
				this.myNativeStackShops.addChild(stackLayoutShops);
				this.myNativeStackShops.visibility = "collapse";

				const items = [];
				items.push(tabViewUsers);
				items.push(tabViewShops);

				// Set TABS en TabView principal			
				this.myNativeStack.items = items;
				this.myNativeStack.style.fontFamily = "SFProDisplay-Light";
				this.myNativeStack.style.fontSize = 15;				
				this.myNativeStack.selectedIndex = 0;
				this.myNativeStack.on("selectedIndexChange", ( sbargs: SelectedIndexChangedEventData ) => {
					let indexTab = (<SegmentedBar>sbargs.object).selectedIndex;
					console.log("INDEX TAB ******* " + indexTab);
					if(indexTab == 0){	
						this.myNativeStackShops.visibility = "collapse";
						this.myNativeStackUsers.visibility = "visible";
														
					}else{
						this.myNativeStackShops.visibility = "visible";
						this.myNativeStackUsers.visibility = "collapse";					}

				});

	 	}); 		

    }


  	ngOnInit() {


	    if(localstorage.getItem('ResultLogin') != null){
            let userLoginRecord = JSON.parse(localstorage.getItem('ResultLogin'));
            this.userLoginRecordComplete = userLoginRecord;
            this.userLoginRecordUser = userLoginRecord.info;
            if(this.userIdentification == null || this.userIdentification == ""){
        		this.userIdentification = userLoginRecord.info._id;
        	
            }
            this.mainUserSaveIdentification = userLoginRecord.info._id;
            
        	
        }
        		


  	}


  	public viewShopsFollowing(newGridLayoutS){
  		this.getAllFollowingShops(this.userIdentification).then(allShopFollowing => {

			allShopFollowing.forEach( async (elementRecord, index) => {

				this.isFollowerShops(this.mainUserSaveIdentification, elementRecord.markerid._id).then(dataResponse => {

		            var responseUsersMarker = dataResponse;

		            var labelfollowbuttonShops = "";

		            if(responseUsersMarker.length>0){
		              if(responseUsersMarker[0].status == false){
		                labelfollowbuttonShops = "follow";

		              }else if(responseUsersMarker[0].status == true){
		                labelfollowbuttonShops = "unfollow";
		              }             
		            }else{
		              labelfollowbuttonShops = "follow";
		            } 					

					var contadorRow = index;

					this.getImageFilter(elementRecord.markerid.images[0]).then(dataImage=> {

			  			// StackLayout para imagen 
			  			const stackLayoutImage = new StackLayout();
				        stackLayoutImage.marginTop = 10;
				        stackLayoutImage.marginLeft = 36;
				        stackLayoutImage.marginRight = 36;
				        stackLayoutImage.horizontalAlignment = "left";		      

						// Imagen de perfil	
						const newImage = new Image();          
						newImage.src = fromBase64(dataImage.imagesource);
						newImage.stretch = "fill";
						newImage.style.width = 55;
						newImage.style.height = 55;
						newImage.style.borderRadius = 61;
						stackLayoutImage.addChild(newImage);

						// StackLayout para nombre de usuaario
						const newStackLayoutLabel = new StackLayout();
						newStackLayoutLabel.horizontalAlignment = "left";            
						newStackLayoutLabel.height = 75;
						newStackLayoutLabel.marginTop = 10;
						newStackLayoutLabel.marginLeft = 104;                                            

						// Nombre de usuario
						const newLabel = new Label();          
						newLabel.text = elementRecord.markerid.title;
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
						button.id = elementRecord.markerid._id;     
						button.text = localize(labelfollowbuttonShops);
						// button.text = localize(labelfollowbutton);
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
							this.onClickFollowShop(elementRecord, tagButton, responseUsersMarker);

							// this.onClickFollow(elementRecord, tagButton);
						});
						newStackLayoutButton.addChild(button);

						// Stacck para tipo de alamcen
				        const newStackLayoutIcon = new StackLayout();
				        newStackLayoutIcon.style.backgroundColor = new Color("#d9d6e1");
				        newStackLayoutIcon.width = 21;
				        newStackLayoutIcon.height = 21;
				        newStackLayoutIcon.style.borderRadius = 4;
		                newStackLayoutIcon.height = 25;                  
		                newStackLayoutIcon.marginLeft = 104;						
				        newStackLayoutIcon.horizontalAlignment = "left";
				        newStackLayoutIcon.verticalAlignment = "middle";

				        console.log("{*} Valor imagen tipo " + JSON.stringify(elementRecord.markerid));
				        // Imagen de tipo de local
				        const newImageIcon = new Image();          
				        newImageIcon.src = "res://" + elementRecord.markerid.type.icontype;
				        newImageIcon.stretch = "fill";
				        newImageIcon.style.width = 8;
				        newImageIcon.style.height = 14;
				        newImageIcon.style.borderRadius = 4;
				        newStackLayoutIcon.addChild(newImageIcon);					

						// Stacklayout para filas									        
						const gridLayoutMain = new GridLayout();
						gridLayoutMain.height=75;
						gridLayoutMain.width=273;
						gridLayoutMain.horizontalAlignment = "left";
						gridLayoutMain.id = elementRecord.markerid._id;
						gridLayoutMain.addChildAtCell(stackLayoutImage, 0, 0);
						gridLayoutMain.addChildAtCell(newStackLayoutLabel, 0, 0);
						gridLayoutMain.addChildAtCell(newStackLayoutIcon, 0, 0);
						// gridLayoutMain.addChildAtCell(newStackLayoutButton, 0, 0);						
						gridLayoutMain.addRow(new ItemSpec(0, GridUnitType.AUTO));
						//Event to click user profile
				        gridLayoutMain.on(GestureTypes.tap, (args: GestureEventData ) =>{ 
					          let grid = <GridLayout>args.object;           
					          let json_shop_selected: any = allShopFollowing.filter(d => d.markerid._id === grid.id);
					          this.data.storage_vara = json_shop_selected[0].markerid;
					          this.ngZone.run(() => this._routerExtensions.navigate(['markerprofile'])).then();
				        });             					



						// Agrega al GridLayout principal
						newGridLayoutS.addChildAtCell(gridLayoutMain, contadorRow, 0);
						newGridLayoutS.addChildAtCell(newStackLayoutButton, contadorRow, 0);
						newGridLayoutS.addRow(new ItemSpec(0, GridUnitType.AUTO));



					});
				});

  			}); // Fin foreach  			

  		});
  	}


	onClickFollow(elementRecord, tagButton, responseUsersFollow){

	    let objectUpdateUser = {} as User;
	    let objectUpdateUserVisited = {} as User;    
	    let objectUpdateFollowers = {} as Usersfollow;

	    if(responseUsersFollow.length == 0){
			// this.labelfollowbutton = localize("unfollow");
			tagButton.text = localize("unfollow");
			objectUpdateUser.following = this.userLoginRecordUser.following + 1;
			objectUpdateUserVisited.followers = elementRecord.useridfollow.followers + 1;
			//save table usersfollow
			// objectUpdateFollowers.userid = this.userIdentification;
			objectUpdateFollowers.userid = this.mainUserSaveIdentification;			
			objectUpdateFollowers.useridfollow = elementRecord.useridfollow._id;
			objectUpdateFollowers.status = true;
			this.postUserFollower(objectUpdateFollowers).then(dataResponse => {
				console.log("Save User_User " + JSON.stringify(dataResponse));
				responseUsersFollow = [];
				responseUsersFollow.push(dataResponse);
			});
	    }else if(responseUsersFollow[0].status == false){
			tagButton.text = localize("unfollow");
	      	// this.labelfollowbutton = localize("unfollow");
			objectUpdateUser.following = this.userLoginRecordUser.following + 1;
			objectUpdateUserVisited.followers = elementRecord.useridfollow.followers + 1;
			//update table users_markers
			objectUpdateFollowers.status = true;
			this.putUserFollower(this.mainUserSaveIdentification, elementRecord.useridfollow._id, objectUpdateFollowers).then(dataResponse => {
				console.log("Update User_User " + JSON.stringify(dataResponse));
				responseUsersFollow[0].status = dataResponse.status;
			});      
	    }else if(responseUsersFollow[0].status == true){
	      tagButton.text = localize("follow");
	      // this.labelfollowbutton = localize("follow");
	      objectUpdateUser.following = this.userLoginRecordUser.following - 1;
	      objectUpdateUserVisited.followers = elementRecord.useridfollow.followers - 1;
	      //update table users_markers
	      objectUpdateFollowers.status = false;
	      this.putUserFollower(this.mainUserSaveIdentification, elementRecord.useridfollow._id, objectUpdateFollowers).then(dataResponse => {
	        console.log("Update User_Marker " + JSON.stringify(dataResponse));
	        responseUsersFollow[0].status = dataResponse.status;
	      });
	    }

	    this.putUserFinalFollower(this.userLoginRecordUser._id, objectUpdateUser).then(dataResponse => {
	      	this.userLoginRecordComplete.info.following = dataResponse.following
	  	    localStorage.removeItem('ResultLogin');
			localstorage.setItem('ResultLogin', JSON.stringify(this.userLoginRecordComplete));
	      	// console.log(this.userLoginRecordUser);
		    this.putUserFinalFollower(elementRecord.useridfollow._id, objectUpdateUserVisited).then(dataResponseAux => {
		      //****** check this.userLogData.followers = dataResponseAux.followers;

		    });                  

	    });


	}	


	//  onClickFollowUser(elementRecord, tagButton){

	//     let objectUpdateUser = {} as User;
	//     let objectUpdateUserVisited = {} as User;    
	//     let objectUpdateFollowers = {} as Usersfollow;

	// 	// if(elementRecord.status == false){

	//  //      this.labelfollowbutton = localize("following");
	//  //      objectUpdateUser.following = this.userLoginRecordUser.following + 1;
	//  //      // objectUpdateUserVisited.followers = this.userLogData.followers + 1;
	//  //      objectUpdateUserVisited.followers = elementRecord.useridfollow.followers + 1;
	//  //      //update table users_users
	//  //      objectUpdateFollowers.status = true;
	//  //      this.putUserFollower(this.userIdentification, elementRecord.useridfollow._id, objectUpdateFollowers).then(dataResponse => {
	//  //        console.log("Update User_User " + JSON.stringify(dataResponse));
	//  //        // >>>this.elementRecord.status = dataResponse.status;
	//  //      });      
	//  //    }else 
 // 		if(elementRecord.status == true){
	// 	  tagButton.text = localize("follow");
	//       // this.labelfollowbutton = "follow";
	//       objectUpdateUser.following = this.userLoginRecordUser.following - 1;
	//       objectUpdateUserVisited.followers = elementRecord.useridfollow.followers - 1;
	//       //update table users_users
	//       objectUpdateFollowers.status = false;
	//       // save ** this.putUserFollower(this.userIdentification, elementRecord.useridfollow._id, objectUpdateFollowers).then(dataResponse => {
	//       this.putUserFollower(this.mainUserSaveIdentification, elementRecord.useridfollow._id, objectUpdateFollowers).then(dataResponse => {	      	
	//         console.log("Update User_User " + JSON.stringify(dataResponse));
	//         // >>>this.responseUsersFollow[0].status = dataResponse.status;
	//       });
	//     }

	//     this.putUserFinalFollower(this.userLoginRecordUser._id, objectUpdateUser).then(dataResponse => {
	//       	this.userLoginRecordComplete.info.following = dataResponse.following
	//   	    localStorage.removeItem('ResultLogin');
	// 		localstorage.setItem('ResultLogin', JSON.stringify(this.userLoginRecordComplete));
	//       	// console.log(this.userLoginRecordUser);
	// 	    this.putUserFinalFollower(elementRecord.useridfollow._id, objectUpdateUserVisited).then(dataResponseAux => {
	// 	      // this.userLogData.followers = dataResponseAux.followers;

	// 	    });                  

	//     });

	// }


	 onClickFollowShop(elementRecord, tagButton, responseUsersMarker){

		    let objectUpdateMarker = {} as Markerprofile;
		    let objectUpdateFollowers = {} as Usersmarker;


		    if(responseUsersMarker.length == 0){

		      tagButton.text = localize("unfollow");
		      objectUpdateMarker.followers = elementRecord.markerid.followers + 1;
		      //save table users_markers
		      objectUpdateFollowers.userid = this.mainUserSaveIdentification;
		      objectUpdateFollowers.markerid = elementRecord.markerid._id;
		      objectUpdateFollowers.status = true;
		      this.postUserMarkerFollower(objectUpdateFollowers).then(dataResponse => {
		        console.log("Save User_MArker " + JSON.stringify(dataResponse));
		        responseUsersMarker = [];
		        responseUsersMarker.push(dataResponse);
		      });
		    }else if(responseUsersMarker[0].status == false){
		      // this.labelfollowbutton = localize("unfollow");
		      tagButton.text = localize("unfollow");
		      objectUpdateMarker.followers = elementRecord.markerid.followers + 1;
		      //update table users_markers
		      objectUpdateFollowers.status = true;
		      this.putUserMarkerFollower(this.mainUserSaveIdentification, elementRecord.markerid._id, objectUpdateFollowers).then(dataResponse => {
		        console.log("Update User_Marker " + JSON.stringify(dataResponse));
		        responseUsersMarker[0].status = dataResponse.status;
		      });      
		    }else 
		    //***
		    if(elementRecord.status == true){
		      // this.labelfollowbutton = localize("follow");
		  	  tagButton.text = localize("follow");
		      objectUpdateMarker.followers = elementRecord.markerid.followers - 1;
		      //update table users_markers
		      objectUpdateFollowers.status = false;
		      this.putUserMarkerFollower(this.mainUserSaveIdentification, elementRecord.markerid._id, objectUpdateFollowers).then(dataResponse => {
		        console.log("Update User_Marker " + JSON.stringify(dataResponse));
		        // this.responseUsersMarker[0].status = dataResponse.status;
		      });
		    }

		    this.putMarkerFollower(elementRecord.markerid._id, objectUpdateMarker).then(dataResponse => {
		      elementRecord.markerid.followers = dataResponse.followers;

		    });

	}


    async getAllFollowingUsers(userid) {

        try {
            const followingRecordsUsers: Usersfollowextend[] = await this.usersfollowService.getFollowingRecords(userid);            
            return followingRecordsUsers;
        } catch(err) {
            console.log(err);
        }
        
    }

    async getAllFollowingShops(userid) {

        try {
        	/*
        	* return Usersmarkerextend: any
        	*/
            // const followingRecordsShops: Usersmarkerextend[] = await this.usersmarkerService.getFollowingRecords(userid);            
            const followingRecordsShops: any[] = await this.usersmarkerService.getFollowingRecords(userid);                        
            return followingRecordsShops;
        } catch(err) {
            console.log(err);
        }
        
    }      


	async getImageFilter(idImage) {
	  	try {
	    
	    	const dealsRaw: any = await this.imagesService.getImagesFiles(idImage);
	    	return dealsRaw;
      	} catch(err) {
	    	console.log(err);
  		}
      
	}  

    async getInterestsByUsers(idUser: string) {

      try {
      	  /*
      	  * return Usersinterests: any
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

    public goBackProfile() {

		// {animated: false, clearHistory: true}

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

        // this._routerExtensions.navigate(["profilevisited"]);    	

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

    async putMarkerFollower(markerid, objectUpdate: Markerprofile) {

        try {
            const deals_profile: Markerprofile = await this.markerprofileService.updateFollowersMarker(markerid, objectUpdate);
            // var dealsprofilecontent: any = JSON.parse(deals_profile); 
            return deals_profile;
        } catch(err) {
            console.log(err);
        }
        
    }

    async putUserMarkerFollower(userid, markerid, objectUpdate: Usersmarker) {

        try {
            const user_marker_profile: Usersmarker = await this.usersmarkerService.updateFollowersMarker(userid, markerid, objectUpdate);
            // var dealsprofilecontent: any = JSON.parse(deals_profile); 
            return user_marker_profile;
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

    async isFollowerShops(userid, markerid) {

        try {
            const countRecords: Usersmarker[] = await this.usersmarkerService.getRecordFollow(userid, markerid);
            // var dealsprofilecontent: any = JSON.parse(deals_profile); 
            return countRecords;
        } catch(err) {
            console.log(err);
        }
        
    }    
    async postUserMarkerFollower(objectUpdate: Usersmarker) {

        try {
            const user_marker_profile: Usersmarker = await this.usersmarkerService.saveFollowersMarker(objectUpdate);
            // var dealsprofilecontent: any = JSON.parse(deals_profile); 
            return user_marker_profile;
        } catch(err) {
            console.log(err);
        }
        
    }    

}
