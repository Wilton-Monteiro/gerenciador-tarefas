FROM node:18-alpine

WORKDIR /app

# Copiar package.json e package-lock.json para cache
COPY back-end/package*.json ./

# Instalar dependências (produção)
RUN npm install --only=production

# Copiar código da aplicação
COPY back-end/ ./
COPY front-end/ ./front-end/

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["npm", "start"]
