const Footer = () => {
    const date = new Date().getFullYear()
  return (
    <footer className="bg-muted py-6">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {date} MovieMate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
