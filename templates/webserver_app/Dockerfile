# Example dockerfile for a node.js app
FROM node:14.15.0-alpine

COPY package.* ./
RUN npm install

COPY . .

# Make sure this 👇 is the same port as in stackforge.yml
EXPOSE 3000

CMD [ "npm", "run", "start" ]
