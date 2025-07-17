export default function EmailTemplate({name}: { name: string }) {
  return (
    <div>
      <h1>Testing Email Template from {name}</h1>
      <p>This is a test email template for OfferHive.</p>
      <p>Feel free to customize this template as needed.</p>
    </div>
  );
}