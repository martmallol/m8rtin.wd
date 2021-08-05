const context = {
    //Parte de Home (index.html)
    title: 'Welcome to Musicon',
    body: 'Musicon is a budding musical storefront with a mission to share the joy of music. These magnificent auditory tools are designed with musical creators, like you, in mind. Hobbyists, beginners, and experts alike can appreciate the resplendent sounds supplied by each and every instrument we carry. Join us in delivering the euphoric vibrations of melodia to the citizens of the world!',
    
    //Parte de Contact (contact.html)
    instruments: [
      {
        image: 'https://content.codecademy.com/courses/learn-handlebars/musicon/electronic-keyboard.png',
        name: 'Electronic Keyboard',
        description: 'A piano welcomed to the 21th century. Pianists celebrate the compact form factor and the diversity of synthesized rhythms all in one masterful musical machine.',
        price: '$1,999.00',
        sale: '$1,699.89'
      },
      {
        image: 'https://content.codecademy.com/courses/learn-handlebars/musicon/electric-guitar.png',
        name: 'Electric Guitar',
        description: 'Join the legends of the \'50s and \'60s when the marriage of guitar and electricity created the most influential instrument of a generation. Note: picks sold separately.',
        price: '$599.99'
      },
      {
        image: 'https://content.codecademy.com/courses/learn-handlebars/musicon/bass-guitar.png',
        name: 'Bass Guitar',
        description: 'Experience the embodiment of funkadelic frequencies that is the bass guitar. Let the deep low notes of the bass guitar resonate with heartbeats everywhere.',
        price: '$624.99'
      },
      {
        image: 'https://content.codecademy.com/courses/learn-handlebars/musicon/drum-kit.png',
        name: 'Drum Kit',
        description: 'Ever thought, "one instrument isn\'t enough?" Find an answer in the drum kit. Coordinate a collections of drums and cymbals to dictate the rhythm of musical masterpiece.',
        price: '$649.00',
        sale: '$349.00'
      },
      //Agrego un nuevo instrumento (otro objeto dentro del array)
      {
        image: 'https://content.codecademy.com/courses/learn-handlebars/musicon/violin.png',
        name: 'Violin',
        description: 'A versatile that is suited for any and all occasions. Those wearing tuxedos can strum together a classic. Others who prefer overalls can call it a fiddle and play some folk songs.',
        price: '$245.00'
      }
    ]
  };
  
  //Encuentro el elemento en index.html donde esta escrito el script para las handlebars
  const templateElement = document.getElementById('templateHB');
  
  //Accedo al contenido del elemento
  const templateSource = templateElement.innerHTML;
  
  //Compilo el template (esta seccion de html ya esta lista para ser modificada. Solo tengo que pasarle un objeto con los tags que estan en el archivo de html (x ej: title, body).)
  const template = Handlebars.compile(templateSource);
  
  //Le paso como objeto a 'context'. Este script ya esta compilado. Ahora solo debo decidir en que bracket del html ubicare esto
  const compiledHtml = template(context);
  
  //Ubicare ese script en el lugar donde tiene como id a 'information'
  document.getElementById('information').innerHTML = compiledHtml;  