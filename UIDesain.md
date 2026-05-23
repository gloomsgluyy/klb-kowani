<!-- Konfirmasi Identitas - Batik Edition -->
<!DOCTYPE html><html lang="id"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Konfirmasi Identitas - Kongres Luar Biasa</title>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Tailwind Config -->
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-surface-variant": "#554243",
                    "on-primary": "#ffffff",
                    "surface-tint": "#9f3d4c",
                    "primary-container": "#8b2e3d",
                    "on-primary-fixed": "#40000f",
                    "on-tertiary-fixed-variant": "#474745",
                    "surface-container-high": "#eae7e7",
                    "surface-bright": "#fcf9f8",
                    "surface-container-highest": "#e4e2e1",
                    "on-secondary": "#ffffff",
                    "tertiary-container": "#4f4f4d",
                    "secondary-fixed": "#ffe088",
                    "on-secondary-container": "#745c00",
                    "on-secondary-fixed": "#241a00",
                    "on-tertiary-container": "#c2c1be",
                    "outline-variant": "#dbc0c1",
                    "tertiary-fixed": "#e4e2df",
                    "error-container": "#ffdad6",
                    "secondary-container": "#fed65b",
                    "on-surface": "#1b1c1c",
                    "tertiary": "#383836",
                    "inverse-surface": "#303030",
                    "outline": "#887273",
                    "primary": "#6c1628",
                    "on-tertiary": "#ffffff",
                    "surface-container-low": "#f6f3f2",
                    "surface": "#fcf9f8",
                    "secondary": "#735c00",
                    "inverse-primary": "#ffb2b9",
                    "surface-container": "#f0eded",
                    "on-secondary-fixed-variant": "#574500",
                    "surface-container-lowest": "#ffffff",
                    "secondary-fixed-dim": "#e9c349",
                    "on-primary-container": "#ffaab1",
                    "on-error": "#ffffff",
                    "primary-fixed-dim": "#ffb2b9",
                    "on-primary-fixed-variant": "#802635",
                    "surface-variant": "#e4e2e1",
                    "surface-dim": "#dcd9d9",
                    "on-background": "#1b1c1c",
                    "background": "#fcf9f8",
                    "tertiary-fixed-dim": "#c8c6c3",
                    "error": "#ba1a1a",
                    "inverse-on-surface": "#f3f0f0",
                    "on-error-container": "#93000a",
                    "primary-fixed": "#ffdadb",
                    "on-tertiary-fixed": "#1b1c1a"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "base": "4px",
                    "section-gap": "80px",
                    "margin-desktop": "40px",
                    "margin-mobile": "16px",
                    "container-max": "1280px",
                    "gutter": "24px"
            },
            "fontFamily": {
                    "label-sm": ["Inter"],
                    "headline-md": ["Playfair Display"],
                    "body-lg": ["Inter"],
                    "headline-lg-mobile": ["Playfair Display"],
                    "body-md": ["Inter"],
                    "headline-lg": ["Playfair Display"],
                    "label-md": ["Inter"],
                    "display": ["Playfair Display"]
            },
            "fontSize": {
                    "label-sm": ["12px", {"lineHeight": "1.2", "fontWeight": "600"}],
                    "headline-md": ["24px", {"lineHeight": "1.4", "fontWeight": "700"}],
                    "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "headline-lg-mobile": ["28px", {"lineHeight": "1.3", "fontWeight": "700"}],
                    "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "headline-lg": ["32px", {"lineHeight": "1.3", "fontWeight": "700"}],
                    "label-md": ["14px", {"lineHeight": "1.4", "letterSpacing": "0.01em", "fontWeight": "600"}],
                    "display": ["48px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}]
            }
          }
        }
      }
    </script>
</head>
<body class="bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased">
<!-- TopAppBar Shared Component -->
<header class="bg-surface/90 backdrop-blur-sm sticky top-0 w-full z-50 border-b border-outline-variant">
<div class="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 w-full max-w-container-max mx-auto">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings: 'FILL' 1;">account_balance</span>
<h1 class="font-headline-md text-headline-md text-primary italic">Kongres Luar Biasa</h1>
</div>
<div class="flex items-center justify-center">
<div class="h-10 flex items-center">
<img alt="Kowani Logo" class="h-full w-auto object-contain" src="https://lh3.googleusercontent.com/aida/ADBb0ugolZxe0Ik2UCb0cxCrfnSOpO0WA9wM2HVqu9xmOu_9fn8op4YPCh8l5FB2lYmIC26T2FcfXhfkyLvqKiBJ2O8yr9rekw-F-K8CDtwh69Ui2MY86kIbNWBWjv1WhHdG7n7zMF7Ju5aMCYJRlFS56L25Y6UR8FZONmd9eFXjOiVg4De9E-OFgLpwJUbdn5X1aiV17443OVcakXkvS8FiyumJUI7sHPygOJe4RzdVowZv0gVvK6wddFqzoOdTM-Hu9rojtCKj_pAv">
</div>
</div>
</div>
</header>
<!-- Main Content Area -->
<main class="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop relative overflow-hidden">
<!-- Background Pattern -->
<div class="absolute inset-0 z-0 opacity-20 mix-blend-multiply pointer-events-none">
<img alt="Batik Pattern Background" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOhFAQkCWpNOrgafp9ot_Qy_L-xE03Db7yvJHvfRRVMfYQ4w52p86qMWquWz-3HJ0Jt_vTKI7rWIoXvnqzCVXkvNdxwRDREZZCix_H3hzAYcl4HjCKP2xiZoAfcoqnkH809VfWQbXtQwQ9mLu5JKrQmvdhgY2KwEMSf12RYNvqyidk4xBdDkDppy1_7wU26WbmUYODXIeo2DK9CODjfTLzz6zi1V7VRPxJrDlrdJwu3t64y58QadiAbpCF8f56ErpZIOvdQJbzw1s">
</div>
<!-- Decorative atmospheric blobs for subtle depth -->
<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none z-0"></div>
<div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none z-0"></div>
<!-- Central Identity Confirmation Card -->
<div class="bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant rounded-2xl w-full max-w-lg p-8 md:p-12 relative z-10 shadow-lg flex flex-col items-center text-center">
<!-- Security/Identity Icon -->
<div class="w-24 h-24 rounded-full bg-primary-container/20 flex items-center justify-center mb-8 border border-primary/20 shadow-inner">
<span class="material-symbols-outlined text-primary text-5xl" style="font-variation-settings: 'FILL' 0; font-weight: 300;">badge</span>
</div>
<h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4 italic tracking-wide">Konfirmasi Identitas</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-sm leading-relaxed">
                Apakah benar Anda <strong class="text-on-surface font-semibold">Susi</strong> dari <strong class="text-on-surface font-semibold">Organisasi A</strong>?
            </p>
<!-- Actions Layout -->
<div class="w-full flex flex-col gap-4">
<button class="w-full bg-primary text-on-primary font-label-md text-label-md py-4 px-6 rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md flex items-center justify-center gap-3 transform hover:-translate-y-0.5">
<span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                    Ya, Saya Hadir
                </button>
<button class="w-full border-2 border-secondary text-secondary font-label-md text-label-md py-4 px-6 rounded-full hover:bg-secondary/5 transition-all duration-300 flex items-center justify-center gap-3">
<span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 0;">cancel</span>
                    Tidak
                </button>
</div>
</div>
</main>
<!-- Footer Shared Component -->
<footer class="bg-surface-container-highest/80 backdrop-blur-sm border-t border-outline-variant w-full mt-auto relative z-10">
<div class="flex flex-col md:flex-row justify-between items-center py-8 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto gap-4">
<p class="font-label-sm text-label-sm text-on-surface-variant">© 2024 Kongres Luar Biasa. Empowering the Collective Voice.</p>
<nav class="flex gap-6">
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:underline decoration-secondary underline-offset-4 transition-all duration-200" href="#">Privacy Policy</a>
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:underline decoration-secondary underline-offset-4 transition-all duration-200" href="#">Support</a>
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:underline decoration-secondary underline-offset-4 transition-all duration-200" href="#">Terms of Service</a>
</nav>
</div>
</footer>




</body></html>

<!-- Check-in Tamu (Input) - Batik Edition -->
<!DOCTYPE html><html lang="id" style=""><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Guest Check-in - Kongres Luar Biasa</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Playfair+Display:ital,wght@0,400..900;1,400..900&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-surface-variant": "#554243",
                        "on-primary": "#ffffff",
                        "surface-tint": "#9f3d4c",
                        "primary-container": "#8b2e3d",
                        "on-primary-fixed": "#40000f",
                        "on-tertiary-fixed-variant": "#474745",
                        "surface-container-high": "#eae7e7",
                        "surface-bright": "#fcf9f8",
                        "surface-container-highest": "#e4e2e1",
                        "on-secondary": "#ffffff",
                        "tertiary-container": "#4f4f4d",
                        "secondary-fixed": "#ffe088",
                        "on-secondary-container": "#745c00",
                        "on-secondary-fixed": "#241a00",
                        "on-tertiary-container": "#c2c1be",
                        "outline-variant": "#dbc0c1",
                        "tertiary-fixed": "#e4e2df",
                        "error-container": "#ffdad6",
                        "secondary-container": "#fed65b",
                        "on-surface": "#1b1c1c",
                        "tertiary": "#383836",
                        "inverse-surface": "#303030",
                        "outline": "#887273",
                        "primary": "#6c1628",
                        "on-tertiary": "#ffffff",
                        "surface-container-low": "#f6f3f2",
                        "surface": "#fcf9f8",
                        "secondary": "#735c00",
                        "inverse-primary": "#ffb2b9",
                        "surface-container": "#f0eded",
                        "on-secondary-fixed-variant": "#574500",
                        "surface-container-lowest": "#ffffff",
                        "secondary-fixed-dim": "#e9c349",
                        "on-primary-container": "#ffaab1",
                        "on-error": "#ffffff",
                        "primary-fixed-dim": "#ffb2b9",
                        "on-primary-fixed-variant": "#802635",
                        "surface-variant": "#e4e2e1",
                        "surface-dim": "#dcd9d9",
                        "on-background": "#1b1c1c",
                        "background": "#fcf9f8",
                        "tertiary-fixed-dim": "#c8c6c3",
                        "error": "#ba1a1a",
                        "inverse-on-surface": "#f3f0f0",
                        "on-error-container": "#93000a",
                        "primary-fixed": "#ffdadb",
                        "on-tertiary-fixed": "#1b1c1a"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "base": "4px",
                        "section-gap": "80px",
                        "margin-desktop": "40px",
                        "margin-mobile": "16px",
                        "container-max": "1280px",
                        "gutter": "24px"
                    },
                    "fontFamily": {
                        "label-sm": ["Inter"],
                        "headline-md": ["Playfair Display", "serif"],
                        "body-lg": ["Inter"],
                        "headline-lg-mobile": ["Playfair Display", "serif"],
                        "body-md": ["Inter"],
                        "headline-lg": ["Playfair Display", "serif"],
                        "label-md": ["Inter"],
                        "display": ["Playfair Display", "serif"]
                    },
                    "fontSize": {
                        "label-sm": ["12px", { "lineHeight": "1.2", "fontWeight": "600" }],
                        "headline-md": ["24px", { "lineHeight": "1.4", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
                        "headline-lg-mobile": ["28px", { "lineHeight": "1.3", "fontWeight": "700" }],
                        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
                        "headline-lg": ["32px", { "lineHeight": "1.3", "fontWeight": "700" }],
                        "label-md": ["14px", { "lineHeight": "1.4", "letterSpacing": "0.01em", "fontWeight": "500" }],
                        "display": ["48px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700" }]
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-background text-on-background min-h-screen flex flex-col items-center justify-center p-margin-mobile md:p-margin-desktop relative z-0">
<!-- Decorative Background -->
<div class="fixed inset-0 z-[-1] opacity-20 pointer-events-none" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBOhFAQkCWpNOrgafp9ot_Qy_L-xE03Db7yvJHvfRRVMfYQ4w52p86qMWquWz-3HJ0Jt_vTKI7rWIoXvnqzCVXkvNdxwRDREZZCix_H3hzAYcl4HjCKP2xiZoAfcoqnkH809VfWQbXtQwQ9mLu5JKrQmvdhgY2KwEMSf12RYNvqyidk4xBdDkDppy1_7wU26WbmUYODXIeo2DK9CODjfTLzz6zi1V7VRPxJrDlrdJwu3t64y58QadiAbpCF8f56ErpZIOvdQJbzw1s'); background-size: cover; background-position: center;"></div>
<!-- Guest Check-in Card -->
<main class="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant p-8 md:p-12 relative overflow-hidden z-10">
<!-- Subtle decorative top bar -->
<div class="absolute top-0 left-0 w-full h-2 bg-primary"></div>
<!-- Header Section -->
<header class="text-center mb-8"><img src="https://lh3.googleusercontent.com/aida/ADBb0ugolZxe0Ik2UCb0cxCrfnSOpO0WA9wM2HVqu9xmOu_9fn8op4YPCh8l5FB2lYmIC26T2FcfXhfkyLvqKiBJ2O8yr9rekw-F-K8CDtwh69Ui2MY86kIbNWBWjv1WhHdG7n7zMF7Ju5aMCYJRlFS56L25Y6UR8FZONmd9eFXjOiVg4De9E-OFgLpwJUbdn5X1aiV17443OVcakXkvS8FiyumJUI7sHPygOJe4RzdVowZv0gVvK6wddFqzoOdTM-Hu9rojtCKj_pAv" alt="Logo Kowani" class="h-24 md:h-28 mx-auto object-contain mb-4">
<h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-wide">KONGRES LUAR BIASA</h1></header>
<!-- Form Section -->
<section class="flex flex-col gap-6">
<div class="text-center">
<p class="font-body-md text-body-md text-on-surface-variant">Masukkan Nomor Undangan Anda</p>
</div>
<form class="flex flex-col gap-6" onsubmit="event.preventDefault(); window.location.href='#';">
<div class="relative">
<label class="sr-only" for="invitationNumber">Nomor Undangan</label>
<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-outline">badge</span>
</div>
<input class="w-full pl-12 pr-4 py-4 rounded-lg bg-surface-container-lowest border border-outline focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-lg text-body-lg text-on-surface placeholder:text-outline-variant outline-none" id="invitationNumber" name="invitationNumber" placeholder="Contoh: A-001" required="" type="text">
</div>
<button class="w-full bg-primary text-on-primary font-label-md text-label-md py-4 rounded-lg hover:bg-primary-container hover:shadow-md transition-all flex items-center justify-center gap-2 group" type="submit">
                    Verifikasi Kehadiran
                    <span class="material-symbols-outlined text-on-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
</form>
</section>
<!-- Help Section -->
<div class="mt-8 pt-6 border-t border-outline-variant text-center">
<p class="font-label-sm text-label-sm text-on-surface-variant flex items-center justify-center gap-1">
<span class="material-symbols-outlined text-[16px]">help</span>
                Butuh bantuan? <a class="text-primary hover:underline decoration-primary underline-offset-4" href="#">Hubungi Panitia</a>
</p>
</div>
</main>
<!-- Footer -->
<footer class="mt-12 text-center w-full max-w-container-max z-10 relative">
<p class="font-label-sm text-label-sm text-on-surface-variant">
            © 2024 Kongres Luar Biasa. Empowering the Collective Voice.
        </p>
</footer>




</body></html>

<!-- Bukti Kehadiran - Batik Edition -->
<!DOCTYPE html><html lang="id" style=""><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Success - Kongres Luar Biasa</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Plus+Jakarta+Sans:wght@600;700&amp;family=Playfair+Display:wght@600;700&amp;display=swap" rel="stylesheet">
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-surface-variant": "#554243",
                    "on-primary": "#ffffff",
                    "surface-tint": "#9f3d4c",
                    "primary-container": "#8b2e3d",
                    "on-primary-fixed": "#40000f",
                    "on-tertiary-fixed-variant": "#474745",
                    "surface-container-high": "#eae7e7",
                    "surface-bright": "#fcf9f8",
                    "surface-container-highest": "#e4e2e1",
                    "on-secondary": "#ffffff",
                    "tertiary-container": "#4f4f4d",
                    "secondary-fixed": "#ffe088",
                    "on-secondary-container": "#745c00",
                    "on-secondary-fixed": "#241a00",
                    "on-tertiary-container": "#c2c1be",
                    "outline-variant": "#dbc0c1",
                    "tertiary-fixed": "#e4e2df",
                    "error-container": "#ffdad6",
                    "secondary-container": "#fed65b",
                    "on-surface": "#1b1c1c",
                    "tertiary": "#383836",
                    "inverse-surface": "#303030",
                    "outline": "#887273",
                    "primary": "#6c1628",
                    "on-tertiary": "#ffffff",
                    "surface-container-low": "#f6f3f2",
                    "surface": "#fcf9f8",
                    "secondary": "#735c00",
                    "inverse-primary": "#ffb2b9",
                    "surface-container": "#f0eded",
                    "on-secondary-fixed-variant": "#574500",
                    "surface-container-lowest": "#ffffff",
                    "secondary-fixed-dim": "#e9c349",
                    "on-primary-container": "#ffaab1",
                    "on-error": "#ffffff",
                    "primary-fixed-dim": "#ffb2b9",
                    "on-primary-fixed-variant": "#802635",
                    "surface-variant": "#e4e2e1",
                    "surface-dim": "#dcd9d9",
                    "on-background": "#1b1c1c",
                    "background": "#fcf9f8",
                    "tertiary-fixed-dim": "#c8c6c3",
                    "error": "#ba1a1a",
                    "inverse-on-surface": "#f3f0f0",
                    "on-error-container": "#93000a",
                    "primary-fixed": "#ffdadb",
                    "on-tertiary-fixed": "#1b1c1a"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "base": "4px",
                    "section-gap": "80px",
                    "margin-desktop": "40px",
                    "margin-mobile": "16px",
                    "container-max": "1280px",
                    "gutter": "24px"
            },
            "fontFamily": {
                    "label-sm": [
                            "Inter"
                    ],
                    "headline-md": [
                            "Plus Jakarta Sans"
                    ],
                    "body-lg": [
                            "Inter"
                    ],
                    "headline-lg-mobile": [
                            "Plus Jakarta Sans"
                    ],
                    "body-md": [
                            "Inter"
                    ],
                    "headline-lg": [
                            "Plus Jakarta Sans"
                    ],
                    "label-md": [
                            "Inter"
                    ],
                    "display": [
                            "Plus Jakarta Sans"
                    ]
            },
            "fontSize": {
                    "label-sm": [
                            "12px",
                            {
                                    "lineHeight": "1.2",
                                    "fontWeight": "600"
                            }
                    ],
                    "headline-md": [
                            "24px",
                            {
                                    "lineHeight": "1.4",
                                    "fontWeight": "600"
                            }
                    ],
                    "body-lg": [
                            "18px",
                            {
                                    "lineHeight": "1.6",
                                    "fontWeight": "400"
                            }
                    ],
                    "headline-lg-mobile": [
                            "28px",
                            {
                                    "lineHeight": "1.3",
                                    "fontWeight": "600"
                            }
                    ],
                    "body-md": [
                            "16px",
                            {
                                    "lineHeight": "1.6",
                                    "fontWeight": "400"
                            }
                    ],
                    "headline-lg": [
                            "32px",
                            {
                                    "lineHeight": "1.3",
                                    "fontWeight": "600"
                            }
                    ],
                    "label-md": [
                            "14px",
                            {
                                    "lineHeight": "1.4",
                                    "letterSpacing": "0.01em",
                                    "fontWeight": "500"
                            }
                    ],
                    "display": [
                            "48px",
                            {
                                    "lineHeight": "1.2",
                                    "letterSpacing": "-0.02em",
                                    "fontWeight": "700"
                            }
                    ]
            }
    },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
          font-variation-settings:
          'FILL' 0,
          'wght' 400,
          'GRAD' 0,
          'opsz' 24
        }
    </style>
</head>
<body class="bg-background text-on-background min-h-screen flex flex-col antialiased">
<!-- TopAppBar -->
<header class="bg-surface dark:bg-surface-dim docked full-width top-0 z-50 border-b border-outline-variant dark:border-on-surface-variant">
<div class="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 w-full max-w-container-max mx-auto">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-primary dark:text-primary-fixed-dim" data-icon="account_balance">account_balance</span>
<h1 class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">Kongres Luar Biasa</h1>
</div>
<div>
<img alt="Kowani Logo" class="h-10 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/ADBb0ugolZxe0Ik2UCb0cxCrfnSOpO0WA9wM2HVqu9xmOu_9fn8op4YPCh8l5FB2lYmIC26T2FcfXhfkyLvqKiBJ2O8yr9rekw-F-K8CDtwh69Ui2MY86kIbNWBWjv1WhHdG7n7zMF7Ju5aMCYJRlFS56L25Y6UR8FZONmd9eFXjOiVg4De9E-OFgLpwJUbdn5X1aiV17443OVcakXkvS8FiyumJUI7sHPygOJe4RzdVowZv0gVvK6wddFqzoOdTM-Hu9rojtCKj_pAv">
</div>
</div>
</header>
<!-- Main Content Area -->
<main class="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBOhFAQkCWpNOrgafp9ot_Qy_L-xE03Db7yvJHvfRRVMfYQ4w52p86qMWquWz-3HJ0Jt_vTKI7rWIoXvnqzCVXkvNdxwRDREZZCix_H3hzAYcl4HjCKP2xiZoAfcoqnkH809VfWQbXtQwQ9mLu5JKrQmvdhgY2KwEMSf12RYNvqyidk4xBdDkDppy1_7wU26WbmUYODXIeo2DK9CODjfTLzz6zi1V7VRPxJrDlrdJwu3t64y58QadiAbpCF8f56ErpZIOvdQJbzw1s')] bg-cover bg-center">
<div class="max-w-2xl w-full bg-surface-container-lowest/95 backdrop-blur-sm rounded-xl border border-outline-variant shadow-lg overflow-hidden flex flex-col items-center text-center p-8 md:p-12 relative">
<!-- Success Icon -->
<div class="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center mb-8 relative">
<span class="material-symbols-outlined text-6xl text-primary" data-icon="check_circle" data-weight="fill" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<div class="absolute inset-0 rounded-full border-4 border-primary opacity-20 animate-ping"></div>
</div>
<!-- Welcome Message -->
<h2 class="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-primary mb-4">Selamat Datang!</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-md mx-auto">
                Terima kasih, Susi, sudah menghadiri Kongres Luar Biasa.
            </p>
<!-- Bukti Kehadiran Heading -->
<div class="w-full text-left mb-4">
<h3 class="font-['Playfair_Display'] text-2xl font-bold text-primary border-b border-outline-variant pb-2">Bukti Kehadiran</h3>
</div>
<!-- Details Card -->
<div class="w-full bg-surface-container-low rounded-lg p-6 mb-8 text-left border border-outline-variant">
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Nama</p>
<p class="font-body-md text-body-md font-medium text-on-surface">Susi</p>
</div>
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Organisasi</p>
<p class="font-body-md text-body-md font-medium text-on-surface">Organisasi A</p>
</div>
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">No Undangan</p>
<p class="font-body-md text-body-md font-medium text-on-surface">A-001</p>
</div>
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Waktu Kedatangan</p>
<p class="font-body-md text-body-md font-medium text-on-surface">Today, 09:00</p>
</div>
</div>
</div>
<!-- Instruction -->
<p class="font-body-md text-body-md text-on-surface-variant mb-8 bg-secondary-fixed text-on-secondary-fixed py-3 px-6 rounded-lg inline-block font-medium">
<span class="material-symbols-outlined align-middle mr-2 text-on-secondary-fixed" data-icon="info">info</span>
                Silakan tunjukkan halaman ini kepada resepsionis.
            </p>
<!-- Action Button -->
<button class="bg-primary text-on-primary font-label-md text-label-md py-4 px-8 rounded-full hover:bg-primary-container transition-colors flex items-center gap-2 shadow-sm">
<span class="">Cek Peserta Lain</span>
<span class="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</main>
<!-- Footer -->
<footer class="bg-surface-container-highest dark:bg-surface-dim border-t border-outline-variant dark:border-outline w-full mt-auto">
<div class="flex flex-col md:flex-row justify-between items-center py-8 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto gap-4">
<p class="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-fixed-variant">
                © 2024 Kongres Luar Biasa. Empowering the Collective Voice.
            </p>
<div class="flex gap-6">
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Support</a>
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
</div>
</div>
</footer>




</body></html>