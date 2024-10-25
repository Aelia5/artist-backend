const { NODE_ENV, BASE_URL } = process.env;

const confirmLetter = (user) => `
<style>
@font-face {
   font-family: 'Eskal';
   src: url(${
     NODE_ENV === 'production'
       ? `${BASE_URL}/fonts/eskal.ttf`
       : 'https://vk.com/doc17555747_437656792'
   });
}
p {font-size: 28px;
text-align: center;
font-family: "Eskal", "Comic Sans MS", "Comic Sans", cursive;
-webkit-text-stroke: .3px #FFF;
text-stroke: .3px #FFF;
font-style: italic;
}
a:hover {
opacity: .8;
}
</style>
<div style="background-image: url(${
  NODE_ENV === 'production'
    ? `${BASE_URL}/images/email-background.jpg`
    : 'https://www.onlygfx.com/wp-content/uploads/2017/12/turquoise-watercolor-texture-9.jpg'
});
background-position: center;
background-repeat: no-repeat;
background-size: cover;
min-height: 300px;
padding-top: 20px;">
<p>Hello, ${user.name}!</p>
<p>Glad to welcome you in my art workshop!</p>
<p>Please take a second to confirm your e-mail by following the link below:</p>
<p><a href=${
  NODE_ENV === 'production' ? BASE_URL : 'http://localhost:3001'
}/api/verify/${user._id}/${user.token}>E-mail confirmation</a></p>
<p style="text-align: right">Sabina Tari</p>
<p style="text-align: right">Artist | 3D Sculptor | Creative soul</p>
</div>`;

module.exports = { confirmLetter };
