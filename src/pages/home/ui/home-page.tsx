import { Configurator } from '@/widgets/configurator';
import { Credits } from '@/widgets/credits';
import { Details } from '@/widgets/details';
import { SiteHeader } from '@/widgets/header';
import { Hero } from '@/widgets/hero';

export function HomePage() {
  return (
    <>
      <a className="skip-link" href="#configurator">
        Skip to the configurator
      </a>
      <div id="top" />
      <SiteHeader />
      <main>
        <Hero />
        <Configurator />
        <Details />
      </main>
      <Credits />
    </>
  );
}
