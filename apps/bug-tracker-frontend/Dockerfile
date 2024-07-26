# Stage 1: Build the React app
FROM docker.io/node:lts-alpine

# Set the working directory
WORKDIR /app

RUN addgroup --system bug-tracker-frontend && \
	adduser --system -G bug-tracker-frontend bug-tracker-frontend

COPY dist/apps/bug-tracker-frontend bug-tracker-frontend/
RUN chown -R bug-tracker-frontend:bug-tracker-frontend .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix bug-tracker-frontend --omit=dev -f install

# Build the Vite React app
RUN npm run nx build bug-tracker-frontend

# Stage 2: Serve the React app using a lightweight web server
FROM nginx:stable-alpine

# Copy the build output to the nginx html folder
COPY dist/apps/bug-tracker-frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
