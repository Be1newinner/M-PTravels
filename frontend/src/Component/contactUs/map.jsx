export default function Map() {
  return (
    <div>
      <div className="bg-slate-50 flex justify-center py-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d71189.15518396992!2d78.01551221953348!3d27.17162688618033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747121d702ff6d%3A0xdd2ae4803f767dde!2sTaj%20Mahal!5e1!3m2!1sen!2sin!4v1737105586432!5m2!1sen!2sin"
          width="100%"
          height="500"
          allowfullscreen=""
          loading="lazy"
          title="Google Map"
          referrerpolicy="no-referrer-when-downgrade"
          className="w-11/12 rounded-2xl outline-none"
        ></iframe>
      </div>
    </div>
  );
}
