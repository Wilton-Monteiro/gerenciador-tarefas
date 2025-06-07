FROM node:18-alpine

WORKDIR /app

# Copiar package.json e package-lock.json primeiro para otimizar cache
COPY back-end/package*.json ./

# Instalar dependências
RUN npm install --only=production

# Copiar código da aplicação
COPY back-end/ ./
COPY front-end/ ./front-end/

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Mudar ownership dos arquivos
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expor a porta que a aplicação usa
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Comando para iniciar a aplicação
CMD ["npm", "start"]