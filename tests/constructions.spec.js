/* global factor, phi, isPow2 */
import { test, expect } from "@playwright/test";
import { adresse, surveiller } from "./outils.js";

test.beforeEach(async ({ page }) => {
  await page.goto(adresse("index.html"));
});

test("factorisation et φ(n) ; Gauss-Wantzel ⇔ φ(n) puissance de 2", async ({ page }) => {
  const ecarts = await page.evaluate(() => {
    const out = [];
    const fermat = [3, 5, 17, 257, 65537];
    for (let n = 3; n <= 5000; n++) {
      const f = factor(n);
      if (f.reduce((p, [q, e]) => p * q ** e, 1) !== n) out.push(`factor(${n})`);
      let compte = 0;
      for (let k = 1; k <= n; k++) { let a = k, b = n; while (b) [a, b] = [b, a % b]; if (a === 1) compte++; }
      if (phi(n) !== compte) out.push(`phi(${n})`);
      const gauss = f.every(([p, e]) => p === 2 || (fermat.includes(p) && e === 1));
      if (gauss !== isPow2(phi(n))) out.push(`critère pour ${n}`);
    }
    return out;
  });
  expect(ecarts).toEqual([]);
});

const CAS = [
  [17, true], [7, false], [9, false], [15, true], [60, true], [257, true], [11, false], [65537, true], [65537 * 3, true], [65537 * 9, false],
];

for (const [n, constructible] of CAS) {
  test(`interface : polygone à ${n} côtés ${constructible ? "" : "non "}constructible`, async ({ page }) => {
    const suivi = surveiller(page);
    await page.locator("#n").fill(String(n));
    await page.click("#go");
    await expect(page.locator("#result")).toContainText(constructible ? "est constructible" : "n'est pas constructible");
    await expect(page.locator("#phi")).toContainText(`φ(${n})`);
    if (n <= 30) await expect(page.locator("#polygon circle")).toHaveCount(n + 1);
    suivi.verifier();
  });
}
