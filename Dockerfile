FROM node:latest

RUN mkdir -p /app
# /app 디렉토리를 WORKDIR 로 설정
WORKDIR /app
# 현재 Dockerfile 있는 경로의 모든 파일을 /app 에 복사
ADD . /app

# 가능한 package.json 과 package-lock.json을 모두 복사하기 위해서 와일드 카드 사용
COPY package*.json /app/
COPY deployment.yaml /app/

RUN npm install

# 앱 소스코드 추가
COPY main.js /app/

ENV NODE_ENV="production"
ENV DB_HOST="34.64.226.59"
ENV DB_USER="ggmap"
ENV DB_PW="ggmap"
ENV DB_NAME="ggmap_db"
ENV COOKIE_SECRET="ggmap"


EXPOSE 5000

# Start the application
CMD ["npm", "start"]
