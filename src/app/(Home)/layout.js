import "./globals.css";
export const metadata = {
  title: "RecipeBook - Make anything in home ||Debjeet Dhar",
  description: "This is a webApp where you can serch and fing any recipe and also Bookmark , filter and also Ai recipe maker which alos help you. by Debjeet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
