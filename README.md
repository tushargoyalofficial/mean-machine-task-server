# NODE Server

Steps to run server

1. cd into folder

2. run $npm i

3. If you want to configure host and port, navigate to server/config.json. host and port is there

4. If you want to configure mongodb, navigate to server/datasource.json, edit mongodb object

5. After this just run $ node . or also you can use pm2 start project_dir_name. Note: pm2 should be installed globally using command $ npm i -g pm2.

6. If server start successfully, you will see this message on your console:
Web server listening at: http://localhost:3000
Browse your REST API at http://localhost:3000/explorer

Above host and port will be come from config.json file which you will configure according to your needs

Current default settings:
mongodb://localhost:27017/db_meanmachine
"host": "0.0.0.0",
"port": 3000,
