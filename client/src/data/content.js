export default {
  tuto_steps : [
    {
      index: 0,
      image: "/images/tuto_step1.svg",
      title: "Retrouvez votre exposition personnelle",
      subtitle: "Soit l'ensemble des œuvres que vous avez peekées lors de votre visite"
    },
    {
      index: 1,
      image: "/images/tuto_step2.svg",
      title: "Découvrez du contenu supplémentaire sur les œuvres",
      subtitle: "Contexte, anecdotes ou encore des œuvres relatives"
    }
  ],
  pieces : [
    {
      index: 0,
      name: "Maus II / Auschwitz",
      date: "1991",
      type: "Album",
      peeked: true,
      content: [
        {
          title: "Le Zoomorphisme",
          type: "Text",
          content: "Le zoomorphisme est un style familier aux dessins animés et aux bandes dessinées, pour représenter les différents groupes nationaux : les Juifs deviennent des souris (« Maus » signifie « souris » en allemand), les Allemands sont des chats, les Américains des chiens, et les Polonais des porcs."
        },
        {
          title: "Vladek Spiegelman",
          type: "Video",
          content: "Vladek Spiegelman est le père d'Art. C'est lui qui témoigne de son histoire."
        }
      ]
    }
  ]
}
