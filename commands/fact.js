const factArray = [':b:eans are the large seeds of certain types of plants, and are technically a fruit.',
'January 6th is National :b:ean Day. It also falls on the day in which geneticist, Gregor Mendel (:goat:), who famously used :b:ean and pea plants to test his theories on inheritance died in 1884.',
':b:eans have been cultivated by humans for 6,000 years.',
'In Nicaragua, newlyweds are given a bowl of :b:eans for good luck.',
'In ancient Greece, minor public officials were elected by putting one white :b:ean with a load of black :b:eans inside a “:b:ean machine.” Whoever picked the white :b:ean got the job.',
'An archaeologist in the 1980’s working in New Mexico came upon a clay pot sealed with pine tar containing :b:ean seeds that were 1,500 years old…and they grew!',
':b:eans can be made into burgers, cakes, drinks, pies, fudge, muffins, jewelry, furniture (:b:ean-bag chairs!), toys, and musical instruments.',
'In the 6th century BC, philosopher and mathematician Pythagoras (certified dumbass because he hated beans) had a deep philosophical dislike of :b:eans. Some historians reported his aversion was due to the belief that legumes contained the souls of the dead',
'Approximately 71,089 people in the world have the last name :b:ean.',
'Vermont ranks highest in searching for :b:ean recipes online. Montana and Wyoming are second and third.',
'The longest recorded time for sitting in a bath of cold baked :b:eans is 100 hours by Barry “Captain :b:eany” Kirk',
"Beans are very good source of fibers, protein, vitamins, complex carbohydrates, folate, and iron but some of them, like red and white kidney beans, also have toxins while they are raw.",



];

module.exports = {
    name: "fact",
    description: "bean facts",
    execute(msg, args) {
        var s = Math.floor(Math.random()*6);
        if(s > 0){
        var x = Math.floor(Math.random() * 12);
        msg.channel.send(factArray[x])
        } else {
            msg.channel.send("Shut up nerd no :b:ean facts for your broke ass")
        }
    }
}