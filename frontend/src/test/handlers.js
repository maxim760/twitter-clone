import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:8888/users/me", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: "success",
        data: {
          confirmed: true,
          followers: 0,
          followings: 0,
          _id: "5fce5027e4be521094043792",
          email: "maks.tomanov@mail.ru",
          username: "maximFirst23",
          fullname: "Maxim Tomanov",
          createdAt: "2020-12-07T15:54:15.385Z",
          updatedAt: "2021-01-20T22:33:54.348Z",
          __v: 0,
          avatar:
            "http://res.cloudinary.com/max-twitter-clone/image/upload/v1611073880/s0y7djg3li1kdbs9rfqw.png",
          background:
            "http://res.cloudinary.com/max-twitter-clone/image/upload/v1610547693/d5qfmmkigupbysticz8w.png",
          about: "Проверяю длинную ссылку в веб-сайте",
          location: "место положения",
          born: "2002-01-24",
          website:
            "https://github.com/maxim760/librarie-js-react/blob/main/main",
        },
      })
    );
  }),
];
