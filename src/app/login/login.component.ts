import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
// import { NgZone } from "@angular/core";
import { Page } from "tns-core-modules/ui/page"
import { NavigationExtras } from "@angular/router";
import { Auth0 } from 'nativescript-auth0';
import * as jwt from "jwt-decode";
import * as localstorage from "nativescript-localstorage";
import { User } from "../shared/models/user.model";

import { UsersinterestsService } from "../shared/api/usersinterests/usersinterests.service";
import { Usersinterestsextend } from "../shared/models/usersinterestsextend.model";

// import { UsersdealsService } from "../shared/api/usersdeals/usersdeals.service";
// import { Usersdeals } from "../shared/models/usersdeals.model";
import { DealsqrcodeService } from "../shared/api/dealsqrcode/dealsqrcode.service";
import { Dealsqrcode } from "../shared/models/dealsqrcode.model";

import { Data } from "../providers/data/data";
import { TextField } from "tns-core-modules/ui/text-field";

@Component({
    selector: "Login",
    moduleId: module.id,
    styleUrls: ['./login.component.css'],
    templateUrl: "./login.component.html"
})
export class LoginComponent {

    optfilt: any;
    private auth0: Auth0;
    // private lstore: NLocalStorage;
    private jsonFinal: any;

    public lname: string;

    public textname: TextField;
    // private userData: User;

    // constructor(private _routerExtensions: RouterExtensions, private zone: NgZone, private page: Page) {
    constructor(private _routerExtensions: RouterExtensions, private page: Page, 
        private usersinterestsService: UsersinterestsService, 
        private dealsqrcodeService: DealsqrcodeService,
        private data: Data) {
        this.page.actionBarHidden = true;
        // this.page.backgroundSpanUnderStatusBar = true;

        // this.page.className = "page-login-container";
        // this.page.statusBarStyle = "dark";
        this.auth0 = new Auth0('u5l96Kp3uEDJ7PSfhH56WyHIJe4PaiXd', 'devappmobile.auth0.com');
    }

    login() {
        /// Promise returns credentials object
        this.auth0.webAuthentication({
            scope: 'openid profile email bio offline_access', scheme: "influmemobile"
        }).then((result) => {            
        // console.log(result);
            
            this.navigateUser(result);  
        }).catch((e: Error) => console.log(e, e.stack));
        //this.navigateHome();
        //this.navigateUser("res");
    }

    private navigateHome() {
        this.optfilt = []
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "DataList": JSON.stringify(this.optfilt)
          }
        };
        // this._routerExtensions.navigate(["viewmap", this.optfilt]);
        // this.zone.run(() => {
        this._routerExtensions.navigate(["viewmap"], navigationExtras )
            // {
            //     clearHistory: true,
            //     animated: true,
            //     transition: {
            //         name: "slideTop",
            //         duration: 350,
            //         curve: "ease"
            //     }
            // });
        // });
    }

    private navigateUser(res) {

        // this.auth0.getUserInfo(res['accessToken']).then((result) => {            
        //     // console.log("[*] Promise "+ result.nickname);
        //     this.jsonFinal = {
        //         "name": result.name,
        //         "nickname": result.nickname,
        //         "pictureURL": result.pictureURL,
        //         "city": "",
        //         "accessToken": res['accessToken'],
        //         "idToken": res['idToken'],
        //         "intereses": []
        //     };            
        //     // console.log('[****] JSON DATA '+ JSON.stringify(this.jsonFinal));
        
        // }).catch((e: Error) => console.log(e, e.stack));        
        
        const usuario: string = jwt(res['idToken']);

        console.log("[*] Datos de Login Res" + JSON.stringify(res));

        console.log("[*] Datos de Login Usuario con token" + JSON.stringify(usuario));

        console.log("[*] Token refresh" + res['refreshToken']);



        // for (const key in res) {

        //   console.log("[****] Field " + key);
          
        // }



        

        // let usuarioJson: any = JSON.parse(usuario);

        let userData = {} as User;

        userData.username = usuario["nickname"];
        userData.name = usuario["name"];
        userData.city = "";
        userData.email = "";
        userData.picturehome = usuario["picture"];
        userData.followers = 0;
        userData.following = 0;
        userData.influencer = false;
        userData.approvedinfluencer = null;

        this.textname = new TextField();
        this.textname.text = userData.name;

        //Para verificar si es nuevo (0) o edicion (1)
        let editOption = 0;

        //verifica si existe el username registrado. 
        this.getUserInterestsProfile(userData.username).then(dataUserResponse => {

            let userProfile: any={};
            let interestsProfile = [];
            let userSearchProfile = [];
            let intereses: any = [];
            let subIntereses: any = {};            
            
            let allUsers: any;
            let onlyUser: any;    

            let navigationExtras: NavigationExtras;        
            
            dataUserResponse = dataUserResponse.filter(useritem => useritem.userid != null);
            
            //get all idUser
            allUsers = dataUserResponse.map(function(userList) {
                return userList.userid._id;
            });            

            //Remove duplicate ids 
            allUsers = allUsers.filter(function(elem, index, self) {
              return index === self.indexOf(elem);
            })

            allUsers.forEach(function(element) {

              onlyUser = dataUserResponse.filter(useritem => useritem.userid._id === element);
              onlyUser.forEach(function(row) {                  
                userProfile.info = row.userid;
                interestsProfile.push(row.typeid)
              });
              
              userProfile.interests = interestsProfile;                  
              userSearchProfile.push(userProfile);

            });   

            if(userSearchProfile.length>0) {

                for(var i=0; i<userSearchProfile[0].interests.length; i++){
                        subIntereses = {};
                        subIntereses.id =  userSearchProfile[0].interests[i]._id;       
                        subIntereses.img = userSearchProfile[0].interests[i].icontype;
                        subIntereses.width = "10.9";
                        subIntereses.height = "18";
                        intereses.push(subIntereses);      
                }                

                this.buildJsonUser(userSearchProfile[0].info, res, intereses, usuario);

                localstorage.setItem('ResultLogin', JSON.stringify(this.jsonFinal));

                this.getDealsSubscribe(userSearchProfile[0].info._id).then(dealsResponse => {                    

                    this.data.storage_vara = dealsResponse;

                    editOption = 1;
                    navigationExtras = {
                        queryParams: {
                            "menuOption": editOption
                        }
                    };            
        
                    this._routerExtensions.navigate(["profile"], navigationExtras);
                });                                       

            }else
            {


                    

                // console.log("USUARIO A BUSCAR NAME **** " + this.textname.text);
                // this.buildJsonUserAUX(userData);

                // this.getUserInterestsProfileByNames().then(dataUserByNameResponse => {

                //     let verifyIfUser: any=[];

                //     verifyIfUser = dataUserByNameResponse.filter(useritem => useritem.userid != null);

                //     console.log("VERIFY USER BY NAME " + JSON.stringify(verifyIfUser));
                    
                    //***** SI NO EXISTE USUARIOS

                    this.buildJsonUser(userData, res, [], usuario);

                    localstorage.setItem('ResultLogin', JSON.stringify(this.jsonFinal));                       

                    editOption = 0;
                    navigationExtras = {
                        queryParams: {
                            "menuOption": editOption
                        }
                    };                
                    this._routerExtensions.navigate(["user"], navigationExtras );

                    //***** FIN SI NO EXISTE USUARIOS
                //});
                
            }

        });
        


    }

    public buildJsonUser(userData, res, interesesparm, usuario){
        this.jsonFinal = {
            "info": userData,
            // "pictureURL": usuario["picture"],
            "accessToken": res.accessToken,
            "refreshToken": res.refreshToken,
            "idToken": res.idToken,            
            "intereses": interesesparm,
            "token_detail": JSON.stringify(res),
            "raw_profile": JSON.stringify(usuario)
        };        
    }

    private routeMap() {

        this._routerExtensions.navigate(["viewmap"]);


  }

    async getUserInterestsProfile(username: string) {

        try {
            const user_profile: Usersinterestsextend[] = await this.usersinterestsService.getTypesFromNickname(username);
            return user_profile;
        } catch(err) {
            console.log("[*] Error: " + err);
        }
        
    }

    async getUserInterestsProfileByNames(username: string) {

        try {
            const user_profile: Usersinterestsextend[] = await this.usersinterestsService.getTypesFromUsersName(username);
            return user_profile;
        } catch(err) {
            console.log("[*] Error: " + err);
        }
        
    }    

    async getDealsSubscribe(userId: string) {

          try {
              const users_deals: any = await this.dealsqrcodeService.getAllDealsSubscribe(userId);
              return users_deals;
          } catch(err) {
              console.log(err);
          }
          
    }    


}
