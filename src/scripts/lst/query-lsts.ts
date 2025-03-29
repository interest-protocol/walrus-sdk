import { PACKAGES } from 'src/blizzard';

import { suiClient } from '../utils.script';

(async () => {
  const lst = await suiClient.queryEvents({
    query: {
      MoveEventType: `${PACKAGES.BLIZZARD.original}::blizzard_event_wrapper::BlizzardEvent<${PACKAGES.BLIZZARD.original}::blizzard_events::NewLST>`,
    },
  });

  const states = lst.data.map(
    (event) => (event.parsedJson as any).pos0.inner_state
  );

  const objects = await suiClient.multiGetObjects({
    ids: states,
    options: {
      showContent: true,
    },
  });

  console.log(objects.map((x) => x.data?.content));
})();
