@props(['url'])
<div role="separator" style="line-height: 24px">&zwj;</div>
<div>
    <a href="{{ $url }}" class="hover-bg-brand-500" style="display: inline-block; border-radius: 4px; background-color: #4e76c2; padding: 16px 24px; font-size: 16px; font-weight: 600; line-height: 1; color: #f9fafb; text-decoration: none">
        <!--[if mso]>
      <i style="mso-font-width: -100%; letter-spacing: 32px; mso-text-raise: 30px" hidden>&nbsp;</i>
    <![endif]-->
        <span style="mso-text-raise: 16px">
            {{ $slot }}
        </span>
        <!--[if mso]>
      <i style="mso-font-width: -100%; letter-spacing: 32px;" hidden>&nbsp;</i>
    <![endif]-->
    </a>
</div>
<div role="separator" style="line-height: 24px">&zwj;</div>