import { Component, ViewEncapsulation } from '@angular/core';
import { MarkdownComponent, provideMarkdown } from 'ngx-markdown';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-result',
  standalone: true,
  providers: [provideMarkdown()],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
  imports: [MarkdownComponent, NgOptimizedImage],
  encapsulation: ViewEncapsulation.None,
})
export class ResultComponent {
  toneMarkdown: string =
    'The tone we wish to convey is one of harmony, sophistication, and vibrancy. We aim to portray an image of a culinary experience that is not just about sustenance but also a celebration of well-being and environmental consciousness. Imagery should reflect freshness, diversity, and the joy of savoring wholesome meals.';

  targetAudienceMarkdown: string =
    'Our primary audience includes health-conscious individuals aged 25-55, encompassing busy professionals, fitness enthusiasts, and those with specific dietary preferences. HarmonyBites caters to individuals seeking a convenient yet conscientious approach to their daily meals, valuing both nutrition and sustainability.';
  styleGuideMarkdown: string =
    '- **Primary Font:** Nunito Sans for its clean and modern aesthetic, promoting readability.\n' +
    '- **Secondary Font:** Montserrat for headers and accents, adding a touch of elegance.\n' +
    '- **Color Palette:** Earthy tones such as olive green (#6B8E23), muted orange (#FFA07A), and neutral tones, coupled with crisp whites for a fresh and inviting feel.';
  markdown: string =
    '# Website Design Brief\n' +
    '\n' +
    '## Business Details\n' +
    '- **Business Name:** HarmonyBites\n' +
    '\n' +
    '## Business Overview (500 words or more)\n' +
    'HarmonyBites is not merely a meal service; it is a manifestation of a culinary philosophy that seeks to harmonize health, sustainability, and gastronomic pleasure. In a world where fast food often compromises nutrition, HarmonyBites emerges as a haven for individuals striving for a balance between wholesome, flavorful meals and the convenience of contemporary living.\n' +
    '\n' +
    'Our mission at HarmonyBites transcends the conventional boundaries of meal delivery. We are dedicated to reshaping the landscape by providing chef-crafted, nutrient-rich meals that not only nourish the body but also champion sustainability. Our commitment is evident in our careful selection of ingredients — prioritizing organic produce, responsibly-raised proteins, and eco-friendly packaging.\n' +
    '\n' +
    'Each HarmonyBites meal is a symphony of flavors, a culinary odyssey curated to elevate your dining experience. Our team of skilled chefs combines creativity with nutritional expertise to craft a diverse menu accommodating various dietary preferences and restrictions. Whether you are a busy professional, a fitness enthusiast, or someone navigating specific dietary paths, HarmonyBites ensures that every bite is a step toward a healthier, more balanced lifestyle.\n' +
    '\n' +
    '## Why HarmonyBites is Unique\n' +
    'HarmonyBites distinguishes itself in then   meal delivery market through an unwavering commitment to the trinity of health, taste, and sustainability. What sets us apart is our holistic approach — we are not just delivering meals; we are delivering a lifestyle. Our culinary offerings not only cater to taste buds but also celebrate fresh, locally-sourced ingredients that are gentle on both your body and the environment.\n' +
    '\n' +
    'Beyond the conventional meal delivery model, HarmonyBites actively participates in the sustainable food movement. We engage in partnerships with local farmers, advocate for ethical practices in the food industry, and constantly explore innovative methods to reduce our carbon footprint. Our commitment to sustainability is not a mere feature; it is a fundamental value embedded in every aspect of our business.\n' +
    '\n' +
    '## Target Audience\n' +
    'Our primary audience includes health-conscious individuals aged 25-55, encompassing busy professionals, fitness enthusiasts, and those with specific dietary preferences. HarmonyBites caters to individuals seeking a convenient yet conscientious approach to their daily meals, valuing both nutrition and sustainability.\n' +
    '\n' +
    '## Tone / Image\n' +
    'The tone we wish to convey is one of harmony, sophistication, and vibrancy. We aim to portray an image of a culinary experience that is not just about sustenance but also a celebration of well-being and environmental consciousness. Imagery should reflect freshness, diversity, and the joy of savoring wholesome meals.\n' +
    '\n' +
    '## Style Guide Typography\n' +
    '- **Primary Font:** Nunito Sans for its clean and modern aesthetic, promoting readability.\n' +
    '- **Secondary Font:** Montserrat for headers and accents, adding a touch of elegance.\n' +
    '- **Color Palette:** Earthy tones such as olive green (#6B8E23), muted orange (#FFA07A), and neutral tones, coupled with crisp whites for a fresh and inviting feel.\n' +
    '\n' +
    '## Required Pages\n' +
    '1. **Home:** Introduction to HarmonyBites, featured meals, and promotions.\n' +
    '2. **Menu:** Detailed information on meal options, dietary considerations, and pricing.\n' +
    '3. **About Us:** Our story, commitment to sustainability, and the culinary team.\n' +
    '4. **Blog / Recipes:** Culinary insights, nutrition tips, and featured recipes.\n' +
    '5. **Contact:** Contact information, customer support details, and inquiry form.\n' +
    '6. **Order / Subscription:** Seamless online ordering, subscription options, and account management.\n';
}
