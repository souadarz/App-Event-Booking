FROM node:20-alpine

WORKDIR /app

# COPY package*.json ./
COPY apps/api/package*.json ./ 

RUN npm install

# Copier toute la structure nécessaire pour que les alias fonctionnent
# On monte la racine du projet dans l'image
# COPY ../../apps ./apps
# COPY ../../shared ./shared

# Copier l'API + shared
COPY apps/api ./ 
COPY apps/shared ./shared

# COPY . .

# Build TypeScript
RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
