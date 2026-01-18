← [Back to main README](../README.md)

# What I'd Improve With More Time

If I had more time, here's what I'd focus on:

## Testing
- Add unit tests for the services and components - right now there's no test coverage
- Set up E2E tests to make sure the main flows actually work end-to-end
- Make sure everything is accessible - keyboard navigation, screen readers, proper ARIA labels

## Better UX
- Improve error messages - right now errors are pretty basic, would be nice to have retry buttons and clearer messaging
- Add offline support with a service worker so it works even when the network is down
- Replace spinners with skeleton loaders - feels faster even if it's not
- Make empty states more helpful and less boring

## Performance
- Use virtual scrolling if the user list gets really long - right now it's fine but could be better
- Lazy load images and maybe use WebP format
- Split the bundle better - lazy load routes that aren't used immediately
- Make the cache smarter - maybe refresh in the background or invalidate more intelligently

## Code Quality
- Stricter TypeScript settings - catch more bugs at compile time
- Maybe add NgRx or better state management if the app grows
- Add retry logic for failed API calls
- Set up error tracking (like Sentry) to see what breaks in production

## Dev Stuff
- Add JSDoc comments to the code
- Set up CI/CD so tests and linting run automatically
- Better environment config management
