FROM node:20
 
WORKDIR /use/src/app
 
COPY package*.json ./
 
RUN npm install

RUN npm install -g typescript
 
COPY . .

RUN tsc

EXPOSE 7003
 
CMD [ "node", "dist/index.js" ]