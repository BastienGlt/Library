import { test, expect } from '@playwright/test';

test.describe('Détails d\'un livre', () => {
  test('navigation vers les détails d\'un livre', async ({ page }) => {
    await page.goto('/search?q=JavaScript');
    
    // Attendre les résultats
    await page.waitForSelector('.grid > a', { timeout: 10000 });
    
    // Cliquer sur le premier livre
    await page.locator('.grid > a').first().click();
    
    // Vérifier qu'on est sur la page de détails
    await expect(page).toHaveURL(/\/book\//);
  });

  test('affichage des informations du livre', async ({ page }) => {
    // Utiliser un livre connu pour les tests
    await page.goto('/book/works/OL45804W'); // The Great Gatsby
    
    // Attendre le chargement
    await page.waitForSelector('h1', { timeout: 10000 });
    
    // Vérifier qu'il y a un titre
    const title = page.locator('h1').first();
    await expect(title).toBeVisible();
    
    // Vérifier qu'il y a une description ou des métadonnées
    await expect(page.getByText(/Auteur|Publication|Pages|ISBN/i).first()).toBeVisible();
  });

  test('affichage de la couverture du livre', async ({ page }) => {
    await page.goto('/book/works/OL45804W');
    
    // Attendre le chargement
    await page.waitForTimeout(2000);
    
    // Vérifier qu'il y a une image (couverture ou placeholder)
    const images = page.locator('img');
    await expect(images.first()).toBeVisible();
  });

  test('bouton retour fonctionne', async ({ page }) => {
    // Aller sur la recherche
    await page.goto('/search?q=test');
    await page.waitForTimeout(1000);
    
    // Cliquer sur un livre si disponible
    const firstBook = page.locator('.grid > a').first();
    if (await firstBook.isVisible()) {
      await firstBook.click();
      
      // Attendre la page de détails
      await page.waitForTimeout(1000);
      
      // Utiliser le bouton retour du navigateur
      await page.goBack();
      
      // Vérifier qu'on est revenu sur la recherche
      await expect(page).toHaveURL(/\/search/);
    }
  });
});
