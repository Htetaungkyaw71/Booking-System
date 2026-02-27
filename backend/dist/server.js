import app from "./app.js";
import { seedUsersIfEmpty } from "./seed.js";
const port = process.env.PORT || 3000;
seedUsersIfEmpty()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.error("Startup failed:", err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map