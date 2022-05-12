import { NhostClient } from '@nhost/react';

const nhost = new NhostClient({
  backendUrl: "https://<your>_nhost.run",
});

export { nhost };
