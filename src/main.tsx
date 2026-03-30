// Async bootstrap — gives Module Federation time to initialize shared scope
// before any React code runs. This prevents duplicate React instances.
import('./bootstrap')
