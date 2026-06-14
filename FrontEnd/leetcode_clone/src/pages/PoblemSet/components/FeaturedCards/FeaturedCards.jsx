import './FeaturedCards.css';

export default function FeaturedCards() {
  return (
    <section className="lc-section lc-section-cards" id="featured-cards">
      <div className="lc-section-label">Featured / Favorites</div>
      <div className="lc-cards-row">
        <div className="lc-feat-card wf-card" />
        <div className="lc-feat-card wf-card" />
        <div className="lc-feat-card wf-card" />
        <div className="lc-feat-card wf-card wf-card-partial" />
      </div>
    </section>
  );
}
