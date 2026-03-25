export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export const bookInfo = {
  title: 'True Light',
  author: 'Berhanu Aberra Tadesse',
  description: 'A profound journey of spiritual awakening, faith, and the discovery of freedom through Christ.',
  mainThemes: [
    'Spiritual transformation and awakening',
    'Freedom from depression and anxiety through faith',
    'Biblical wisdom and Christian teachings',
    'Personal testimony and spiritual journey',
    'Hope and renewal in Christ'
  ],
  keyMessages: [
    'True Light addresses the power of faith to transform lives',
    'Discover freedom from spiritual bondage and inner conflict',
    'Learn how encountering Christ brings lasting peace',
    'Biblical foundation rooted in scripture and revealed truth',
    'A testament to hope and liberation through Christ'
  ],
  availability: 'Available on Amazon',
  amazonLink: 'https://www.amazon.com/True-Light-Berhanu-Tadesse/dp/B0DT525949'
};

export const authorInfo = {
  name: 'Berhanu Aberra Tadesse',
  background: 'Born in Ethiopia, Berhanu transitioned from a career in aviation maintenance to a spiritual calling.',
  journey: 'In 2005, he embraced his faith journey with Christ, overcoming battles with depression, anxiety, and inner conflict through spiritual awakening.',
  currentRole: 'Bible study leader and educator in the Ethiopian Christian community of Lynwood, Washington',
  mission: 'Fulfilling purpose through revelation work and spiritual education',
  contact: {
    email: 'info@authorberhanutadesse.com',
    phone: '+1-425-879-4630',
    facebook: 'https://www.facebook.com/Berhanutedesseofficial/',
    linkedin: 'https://www.linkedin.com/company/berhanu-tedesse/'
  }
};

export const christianConcepts = {
  'faith': 'Faith is trust in God and belief in His promises. It\'s the foundation of the Christian journey, enabling us to overcome fear and find peace in uncertain times.',

  'spiritual awakening': 'Spiritual awakening is a profound moment when we become conscious of God\'s presence and purpose in our lives. It\'s a transformative experience that opens our hearts to truth.',

  'freedom in christ': 'Freedom in Christ means liberation from sin, shame, and bondage through His grace. It\'s the promise of new life and renewed purpose through believing in Jesus.',

  'depression and faith': 'While depression is a real struggle, faith teaches us that we are not alone. Through prayer, community, and trust in God, we can find healing and hope.',

  'anxiety and peace': 'Jesus offers peace that surpasses understanding. When we surrender our anxieties to God, we find calm and strength to face life\'s challenges.',

  'salvation': 'Salvation is the gift of eternal life through Christ\'s sacrifice. It\'s God\'s grace extended to all who believe and accept Jesus as their savior.',

  'grace': 'Grace is God\'s unmerited favor and love toward us. It\'s the foundation of forgiveness, redemption, and new beginnings in our faith journey.',

  'redemption': 'Redemption is being restored and freed from sin through Christ\'s sacrifice. It\'s the ultimate act of God\'s love, offering us a second chance at life.',

  'transformation': 'Spiritual transformation is the ongoing process of becoming more like Christ through faith, prayer, and living according to biblical principles.',

  'purpose': 'God has a purpose for each of us. Understanding our purpose comes through seeking God\'s will, listening to His voice, and committing to His plan for our lives.'
};

export const faqData = [
  {
    question: 'What is "True Light" about?',
    answer: `"True Light" is a transformative story of faith, struggle, and spiritual awakening. The book shares Berhanu's personal journey from darkness through depression and anxiety to finding freedom and purpose in Christ. It combines authentic personal experience with biblical wisdom to inspire readers seeking spiritual growth.`
  },
  {
    question: 'Who is the author?',
    answer: `The author is Berhanu Aberra Tadesse, born in Ethiopia. He transitioned from a career in aviation maintenance to answer a spiritual calling. In 2005, he found freedom through Christ, overcoming personal struggles. Today, he serves as a Bible study leader and educator in the Ethiopian Christian community of Lynwood, Washington.`
  },
  {
    question: 'How can I contact Berhanu?',
    answer: `You can contact Berhanu through multiple channels:\n• Email: info@authorberhanutadesse.com\n• Phone: +1-425-879-4630\n• Facebook: Facebook.com/Berhanutedesseofficial\n\nFeel free to reach out with questions, comments, or to discuss the book and ministry work!`
  },
  {
    question: 'Where can I buy the book?',
    answer: `"True Light" is available on Amazon. You can order your copy at: https://www.amazon.com/True-Light-Berhanu-Tadesse/dp/B0DT525949\n\nThe book comes in both digital and physical formats, making it accessible regardless of your preference.`
  },
  {
    question: 'What topics does the book cover?',
    answer: `The book covers:\n• Spiritual transformation and awakening\n• Freedom from depression and anxiety through faith\n• Biblical wisdom and Christian teachings\n• Personal testimony and real-life experiences\n• Hope, renewal, and purpose in Christ\n\nIt's designed for anyone seeking spiritual growth and answers about faith.`
  },
  {
    question: 'Is this book for Christians only?',
    answer: `While "True Light" is written from a Christian perspective and speaks to Christian readers, it can benefit anyone seeking answers about spirituality, purpose, and overcoming life\'s challenges. The honest and relatable storytelling makes it valuable for seekers of any background.`
  }
];

export const generateBotResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase().trim();

  // Check for greetings
  if (message.match(/^(hi|hello|hey|greetings)/)) {
    return `Hello! Welcome! I'm here to help answer questions about "True Light" and Berhanu Aberra Tadesse's work. I can also discuss Christian concepts from the Bible. What would you like to know?`;
  }

  // Check for book-related questions
  if (message.includes('book') || message.includes('true light')) {
    if (message.includes('buy') || message.includes('purchase') || message.includes('order') || message.includes('amazon')) {
      return `You can order "True Light" on Amazon here: ${bookInfo.amazonLink}\n\nThe book is available in both digital and physical formats. It's a transformative read that many have found inspiring on their spiritual journey!`;
    }
    if (message.includes('what') || message.includes('about') || message.includes('topic') || message.includes('cover')) {
      return `"True Light" covers:\n• Spiritual transformation and awakening\n• Freedom from depression and anxiety through faith\n• Biblical wisdom and Christian teachings\n• Personal testimony and real-life experiences\n• Hope and renewal in Christ\n\nIt's a profound journey from darkness to light through Christ.`;
    }
  }

  // Check for author contact
  if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('call') || message.includes('reach') || message.includes('text')) {
    return `Great! Here are Berhanu's contact options:\n\n📧 Email: ${authorInfo.contact.email}\n📱 Phone/Text: ${authorInfo.contact.phone}\n\nYou can also connect on:\n🔗 Facebook: ${authorInfo.contact.facebook}\n💼 LinkedIn: ${authorInfo.contact.linkedin}\n\nBerhanu would love to hear from you!`;
  }

  // Check for author information
  if (message.includes('author') || message.includes('berhanu') || message.includes('who is')) {
    return `${authorInfo.name} is an inspiring figure in the Christian community. Born in Ethiopia, he transitioned from aviation maintenance to answer a spiritual calling. In 2005, he found freedom through Christ, overcoming personal struggles with depression and anxiety. \n\nToday, he serves as a Bible study leader and educator in the Ethiopian Christian community of Lynwood, Washington. His mission is to help others discover the transformative power of faith.`;
  }

  // Check for Christian concept questions
  for (const [concept, explanation] of Object.entries(christianConcepts)) {
    if (message.includes(concept)) {
      return `Great question about ${concept}!\n\n${explanation}\n\nThis is one of the core themes explored in "True Light." Would you like to know more about the book or have other questions?`;
    }
  }

  // Check for FAQ matches
  for (const _faq of faqData) {
    if (message.includes('how') && message.includes('contact')) {
      return faqData[2].answer;
    }
    if (message.includes('where') && (message.includes('buy') || message.includes('purchase'))) {
      return faqData[3].answer;
    }
    if ((message.includes('what') || message.includes('topic')) && message.includes('book')) {
      return faqData[4].answer;
    }
  }

  // Default responses based on keywords
  if (message.includes('help') || message.includes('how can') || message.includes('what can')) {
    return `I'm here to help! I can answer questions about:\n\n📖 "True Light" - the book, its themes, and how to get it\n👤 Berhanu Aberra Tadesse - the author and his journey\n✝️ Christian concepts - faith, grace, redemption, transformation, and more\n📞 How to contact Berhanu - via email, phone, or social media\n\nWhat would you like to know?`;
  }

  if (message.includes('christian') || message.includes('bible') || message.includes('jesus') || message.includes('god') || message.includes('faith') || message.includes('spiritual')) {
    return `That's a wonderful question about Christian faith! I'd be happy to discuss concepts like faith, grace, salvation, redemption, spiritual transformation, and how Christ brings freedom and purpose.\n\nWhich of these topics would you like to explore, or do you have a specific question about your spiritual journey?`;
  }

  if (message.includes('thank') || message.includes('thanks')) {
    return `You're very welcome! If you have any other questions about "True Light," Berhanu, or Christian concepts, feel free to ask. I'm here to help! 🙏`;
  }

  // Fallback response
  return `That's an interesting question! I'm here to answer questions about "True Light," author Berhanu Aberra Tadesse, Christian concepts from the Bible, and how to connect with Berhanu.\n\nCould you clarify what you'd like to know? For example:\n• About the book?\n• About the author?\n• Christian concepts or faith questions?\n• How to contact Berhanu?`;
};
