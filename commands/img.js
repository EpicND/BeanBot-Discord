var imgArr = [
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.medicalnewstoday.com%2Farticles%2F320192&psig=AOvVaw3l2RY4CvFUl7d2ToWzqOND&ust=1590432909641000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMiR4raWzekCFQAAAAAdAAAAABAH',
  'https://www.gracefullittlehoneybee.com/wp-content/uploads/2014/09/Slow-Cooker-Pinto-Beans-3.jpg',
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Fnusciencesolutions.com%2Frecipe%2Fno-gas-home-cooked-beans%2F&psig=AOvVaw3l2RY4CvFUl7d2ToWzqOND&ust=1590432909641000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMiR4raWzekCFQAAAAAdAAAAABAQ',
  'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/320/320192/lots-of-beans-in-a-large-spoon.jpg?w=1155&h=1297',
  'https://img.sndimg.com/food/image/upload/c_thumb,q_80,w_412,h_232/v1/img/recipes/27/78/6/picB92GVL.jpg',
  'https://i.ytimg.com/vi/xilvJ4zWytI/maxresdefault.jpg',
  'https://www.momontimeout.com/wp-content/uploads/2020/01/crockpot-baked-beans-in-metal-serving-dish-title-.jpg',
  'https://www.belovedshirts.com/wp-content/uploads/2019/04/sweatsshirt-front-1.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSP14hWBsCFiTCdjUXZDzSJ41JAowyVhCYiMpkpQgjfVhLwdcMF&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGqYig3gWTlXINog8BDM2f8jUin0qK_x2n9Nku4wy5jESKVBq4&usqp=CAU'
];

module.exports = {
    name: 'img',
    description: 'Sends an image of a bean',
    execute(msg, args) {
      var s = Math.floor(Math.random()*10);
      if(s > 0){
      var x = Math.floor(Math.random() * 12);
      msg.channel.send("Here you go: " + imgArr[x])
      } else {
          msg.channel.send("Why are you addicted to :b:ean photos")
      }
	},
}
