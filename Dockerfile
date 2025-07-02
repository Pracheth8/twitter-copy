FROM node:22

WORKDIR /app

# Copy package.json first (for caching layer)
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install

# Install nodemon globally for dev server
RUN npm install -g nodemon

# Copy the rest of the project
COPY . .

EXPOSE 7090

# Start the app using dev script
CMD ["npm", "run", "dev"]
