export default function Photo({ alt_description, urls: { regular } }) {
  return (
    <>
      <div className="single-photo">
        <img src={regular} alt={alt_description} />
      </div>
    </>
  );
}
