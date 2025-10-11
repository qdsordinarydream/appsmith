------------- server -------------
-- start mongo
-- docker run -d -p 127.0.0.1:27017:27017 --name appsmith-mongodb -e MONGO_INITDB_DATABASE=appsmith -v
/Users/mbj0030/Downloads/temp/mongo:/data/db mongo

    docker run -d \
				  -p 127.0.0.1:27017:27017 \
				  --name appsmith-mongodb \
				  -e MONGO_INITDB_DATABASE=appsmith \
				  -v /Users/test/GolandProjects/appsmith/app/mongo:/data/db \
				  mongo --replSet rs0

-- 如果冲突
docker exec -it appsmith-mongodb mongosh
use appsmith
db.dropDatabase()
rs.initiate()
rs.reconfig({ _id: "rs0", members: [{ _id: 0, host: "localhost:27017" }] }, { force: true })

-- start redis
docker run -d -p 127.0.0.1:6379:6379 --name appsmith-redis redis

-- backend
cd app/server

-- 打 jar 包
-- mvn clean compile -DskipTests

-- 设置环境，这里不用，直接用全局设置变量单位
cp envs/dev.env.example .env

-- 设置环境变量 APPSMITH_MONGODB_URI APPSMITH_REDIS_URI
export APPSMITH_MONGODB_URI="mongodb://localhost:27017/appsmith" export APPSMITH_REDIS_URL="redis://127.0.0.1:6379"
export APPSMITH_MAIL_ENABLED=false export APPSMITH_ENCRYPTION_PASSWORD=abcd export APPSMITH_ENCRYPTION_SALT=abcd

-- 构建
./build.sh

-- 启动服务
./scripts/start-dev-server.sh


------------- client --------------
-- 安装证书依赖
  brew install mkcert
-- 以下执行可能会有环境问题
  cd app/client/docker && mkcert -install && mkcert "*.appsmith.com" && cd ../../..
-- 配置hosts
  echo "127.0.0.1 dev.appsmith.com" | sudo tee -a /etc/hosts
-- 设置环境变量
  cp .env.example .env
-- 启动后端代理
  cd app/client
  -- 开发环境直接 ./start-https.sh --with-docker，修改 nginx/nginx.dev.conf 代理到后端地址
  ./start-https.sh https://release.app.appsmith.com
-- 代码构建和运行
  yarn install & yarn build && yarn start
