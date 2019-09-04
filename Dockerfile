FROM mhart/alpine-node

WORKDIR /app
COPY . .

RUN yarn install
RUN yard build

EXPOSE 3000
CMD ["yarn", "start"]