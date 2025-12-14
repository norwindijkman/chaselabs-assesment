# ChaseLabs Assesment: Norwin Dijkman

The goal of this assessment was to build a polished, functional booking page. The solution focuses on a "Happy Flow".

[https://chaselabs.slam.software](https://chaselabs.slam.software)

## Design Decisions & Trade-offs

1. UX: I chose not to reinvent the wheel regarding UX. Instead, I adhered to the 3-column layout found in Cal.com and Calendly.
2. I prioritized client identity over platform branding. In my experience, enterprise customers place a high value on their own brand presence, so I positioned the ACME logo prominently at the top and intentionally omitted the ChaseLabs logo.
3. Shadcn: I had never used Shadcn before, so I chose to use Shadcn to speed up building the calendar and to already familariaze myself with your stack. It did cause some friction, as I wasn't sure how to customize some of the components in the way I wanted, but it also provided a nice starting point.

## Future improvements

Given the small timeframe, the current build focuses on the core happy flow and there are definitely some improvements to be made.
- Robust Error Handling: Currently, the UI assumes API calls succeed. The error handling from both API failures and user input is minimal.
- Testing: The current testing implementation is extremely minimal.
- User flow improvements: Automatically open the calendar to the first month with available slots, rather than strictly defaulting to the current month.
- Timezone handling: Right now, there are a few timezone handling gaps that need to be fixed.
- Code structure: Make an easier to understand file structure for future maintainability. 
- Client customization: Allow per-client configuration for fonts and primary brand colors.
- Localization?: While English is standard, international sales teams could benefit from localized UI text (though I think this would also require multilingual sales staff from customers).


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.
