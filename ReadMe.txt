1. Setup Environment
	a. download and install Node.js
	b. install xcode and latest simulators
	c. install ionic using command: npm install -g cordova ionic
	please visit ionic getting start page for more information http://ionicframework.com/getting-started/

2. Build Server
	a. Since "Cross domain" does not support "ftp://", we build our server on ftp as we did for our web app
	b. The best way to test our app is to build our local server
		b(1). For me, I use MAMP apache web server. If users decide to use this server, I suggest to change the apache web port 					to 5000. Put the iosServer folder under Applications/MAMP/htdocs folder. 
			MAMP website: http://www.mamp.info/en/
		b(2). If users choose to use other web servers, please make sure to change the AJAX calls urls in Users, Signup, Login 						factories in servers.js file  

3. How to compile
	a. cd to the project directory
	b. build project following commands:
		ionic platform add ios
		ionic build ios
	c. [preferred] for web server test run command: ionic serve (choose localhost)
	d. for ios simulator test run command: ionic emulate ios
		d(1): Since this app is based on current geolocation info, I did not find a proper way to test it on ios simulator
		d(2): if "ionic emulate ios" command does not work, try to open the project directly in xcode.
			To open the project in xcode, open "ziplogger/pltforms/ios/ziplogger.xcodeproj" file in xcode directly.
		d(3): I think we can try to use xcode to build a demo version ios app to check the functionalities. Since the code is working 					well for ionic web server test, it should work fine for ios platform as well


4. Future work
	a. I am currenty using the AngularJS local sessionStorage technology to store the user login session. For making the login and signup part 			perfectly, I recommended to use "ng-token-auth" API, which is a little bit complicate, but a real complete library for user 	   			authentication. More information on its github repository:https://github.com/lynndylanhurley/ng-token-auth

	b. If you could get some UI guy, I think we can optimize the header layout and some other decoration work.


5. Contact information
	Since I graduated this Dec, if you have more questions, just send email to personal email: helloxzk@gmail.com