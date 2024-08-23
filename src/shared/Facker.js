// src/utils/generateTestimonials.js
import { faker } from '@faker-js/faker';

export const generateTestimonials = (count = 10) => {
  const testimonials = [];
  
  for (let i = 0; i < count; i++) {
    const isMale = faker.datatype.boolean(); // Randomly determines if the testimonial is male or female
    const avatarUrl = isMale 
      ? 'https://avatar.iran.liara.run/public/boy' 
      : 'https://avatar.iran.liara.run/public/girl';

    const testimonial = {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      title: faker.name.jobTitle(),
      company: faker.company.name(),
      testimonial: faker.lorem.sentences(3),  // Generates exactly 3 sentences
      avatarUrl: avatarUrl,
      location: faker.address.city() + ', ' + faker.address.country(),
            date: faker.date.past().toLocaleDateString('en-CA'), // Format date to 'YYYY-MM-DD'

    };

    testimonials.push(testimonial);
  }

  return testimonials;
};
