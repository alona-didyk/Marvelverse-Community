const platformSteps = [
  {
    step: "1. Browse and Discover:",
    description:
      "Explore our extensive collection of movies, TV shows, and comic books featuring your favorite Marvel superheroes and villains. Use our intuitive search and browsing features to find exactly what you're looking for.",
  },
  {
    step: "2. Choose and Watch:",
    description:
      "Once you've found something that catches your interest, choose whether you want to watch a movie, binge-watch a TV show, or dive into a comic book series. We offer a wide range of options to suit your preferences.",
  },
  {
    step: "3. Personalize and Track:",
    description:
      "Create your personalized profile and keep track of your favorite movies, TV shows, and comic books. Rate and review the content you've experienced, and receive tailored recommendations based on your interests.",
  },
  {
    step: "4. Engage and Connect:",
    description:
      "Engage with our passionate community of fans and connect with like-minded individuals. Join discussions, share your thoughts and theories, and stay up to date with the latest news and announcements.",
  },
  {
    step: "5. Enjoy Anytime, Anywhere:",
    description:
      "Our platform is designed for convenience and accessibility. Enjoy your favorite content anytime, anywhere, on your preferred device. Whether you're at home, on the go, or on a Marvel-filled adventure, we've got you covered.",
  },
];

export const Work = () => {
  return (
    <section className="work">
      <div className="work__wrapper">
        <h2 className="work__title">HOW DOES THIS WORK?</h2>
        <div className="work-explanation">
          {platformSteps.map((step, index) => (
            <div className="work__border" key={index}>
              <h3 className="work__title2">{step.step}</h3>
              <p className="work__subtitle">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
