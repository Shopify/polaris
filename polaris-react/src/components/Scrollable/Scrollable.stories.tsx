import React, {ComponentRef, useRef} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Button,
  LegacyCard,
  Scrollable,
  Banner,
  Box,
  Text,
  BlockStack,
  FormLayout,
  TextField,
} from '@shopify/polaris';
import type {ScrollableRef} from '@shopify/polaris';

export default {
  component: Scrollable,
} as ComponentMeta<typeof Scrollable>;

const defaultContent = (
  <>
    <p>
      By signing up for the Shopify service (“Service”) or any of the services
      of Shopify Inc. (“Shopify”) you are agreeing to be bound by the following
      terms and conditions (“Terms of Service”). The Services offered by Shopify
      under the Terms of Service include various products and services to help
      you create and manage a retail store, whether an online store (“Online
      Services”), a physical retail store (“POS Services”), or both. Any new
      features or tools which are added to the current Service shall be also
      subject to the Terms of Service. You can review the current version of the
      Terms of Service at any time at https://www.shopify.com/legal/terms.
      Shopify reserves the right to update and change the Terms of Service by
      posting updates and changes to the Shopify website. You are advised to
      check the Terms of Service from time to time for any updates or changes
      that may impact you.
    </p>
    <p>
      By signing up for the Shopify service (“Service”) or any of the services
      of Shopify Inc. (“Shopify”) you are agreeing to be bound by the following
      terms and conditions (“Terms of Service”). The Services offered by Shopify
      under the Terms of Service include various products and services to help
      you create and manage a retail store, whether an online store (“Online
      Services”), a physical retail store (“POS Services”), or both. Any new
      features or tools which are added to the current Service shall be also
      subject to the Terms of Service. You can review the current version of the
      Terms of Service at any time at https://www.shopify.com/legal/terms.
      Shopify reserves the right to update and change the Terms of Service by
      posting updates and changes to the Shopify website. You are advised to
      check the Terms of Service from time to time for any updates or changes
      that may impact you.
    </p>
    <p>
      By signing up for the Shopify service (“Service”) or any of the services
      of Shopify Inc. (“Shopify”) you are agreeing to be bound by the following
      terms and conditions (“Terms of Service”). The Services offered by Shopify
      under the Terms of Service include various products and services to help
      you create and manage a retail store, whether an online store (“Online
      Services”), a physical retail store (“POS Services”), or both. Any new
      features or tools which are added to the current Service shall be also
      subject to the Terms of Service. You can review the current version of the
      Terms of Service at any time at https://www.shopify.com/legal/terms.
      Shopify reserves the right to update and change the Terms of Service by
      posting updates and changes to the Shopify website. You are advised to
      check the Terms of Service from time to time for any updates or changes
      that may impact you.
    </p>
  </>
);

export function Default() {
  return (
    <LegacyCard title="Terms of service" sectioned>
      <Scrollable shadow style={{height: '200px'}} focusable>
        {defaultContent}
      </Scrollable>
    </LegacyCard>
  );
}

export function WithStableScrollbarGutter() {
  return (
    <LegacyCard title="Terms of service" sectioned>
      <Scrollable
        shadow
        style={{height: '200px'}}
        focusable
        scrollbarGutter="stable"
      >
        {defaultContent}
      </Scrollable>
    </LegacyCard>
  );
}

export function WithHorizonalScrollPrevention() {
  return (
    <Scrollable
      shadow
      style={{height: '100px', width: '200px'}}
      horizontal={false}
    >
      <div>
        <p>Last updated on: September 6, 2022</p>

        <p>
          Welcome to Shopify! By signing up for a Shopify Account (as defined in
          Section 1) or by using any Shopify Services (as defined below), you
          are agreeing to be bound by the following terms and conditions (the “
          <strong>Terms of Service</strong>”).
        </p>

        <p>
          As used in these Terms of Service, “<strong>we</strong>”, “
          <strong>us</strong>”, “<strong>our</strong>” and “
          <strong>Shopify</strong>” means the applicable Shopify Contracting
          Party (as defined in Section 13 below), and “<strong>you</strong>”
          means the Shopify User (if registering for or using a Shopify Service
          as an individual), or the business employing the Shopify User (if
          registering for or using a Shopify Service as a business) and any of
          its affiliates.
        </p>

        <p>
          Shopify provides a complete commerce platform that enables merchants
          to unify their commerce activities. Among other features, this
          platform includes a range of tools for merchants to build and
          customize online stores, sell in multiple places (including web,
          mobile, social media, online marketplaces and other online locations
          (“<strong>Online Services</strong>”) and in person (“
          <strong>POS Services</strong>”)), manage products, inventory,
          payments, fulfillment, shipping, business operations, marketing and
          advertising, and engage with existing and potential customers. Any
          such service or services offered by Shopify are referred to in these
          Terms of Services as the “<strong>Service(s)</strong>”. Any new
          features or tools which are added to the current Services will also be
          subject to the Terms of Service. You can review the current version of
          the Terms of Service at any time at
          <a href="https://www.shopify.com/legal/terms">
            https://www.shopify.com/legal/terms
          </a>
          .
        </p>

        <p>
          You must read, agree with and accept all of the terms and conditions
          contained or expressly referenced in these Terms of Service, including
          Shopify’s
          <a href="https://www.shopify.com/legal/aup">Acceptable Use Policy</a>
          (“<strong>AUP</strong>”) and
          <a href="https://www.shopify.com/legal/privacy">Privacy Policy</a>,
          and, if applicable, the
          <a href="https://www.shopify.com/legal/eu-terms">
            Supplementary Terms of Service for E.U. Merchants
          </a>
          (“<strong>EU Terms</strong>”), the Shopify
          <a href="https://www.shopify.com/legal/api-terms">
            API License and Terms of Use
          </a>
          (“<strong>API Terms</strong>”) and the Shopify
          <a href="https://www.shopify.com/legal/dpa">
            Data Processing Addendum
          </a>
          (“<strong>DPA</strong>”) before you may sign up for a Shopify Account
          or use any Shopify Service. Additionally, if you offer goods or
          services in relation to COVID-19, you must read, acknowledge and agree
          to the
          <a href="/legal/rules-of-engagement-covid19">
            Rules of Engagement for Sale of COVID-19 Related Products
          </a>
          .
        </p>

        <p>
          <strong>
            Everyday language summaries are provided for convenience only and
            appear in bold near each section, but these summaries are not
            legally binding. Please read the Terms of Service, including any
            document referred to in these Terms of Service, for the complete
            picture of your legal requirements. By using Shopify or any Shopify
            services, you are agreeing to these terms. Be sure to occasionally
            check back for updates.
          </strong>
        </p>
      </div>
    </Scrollable>
  );
}

export function ScrollToChildComponent() {
  return (
    <LegacyCard title="Terms of service" sectioned>
      <Scrollable shadow style={{height: '200px'}}>
        <ol>
          <li>Account Terms</li>
        </ol>
        <p>
          You must be 18 years or older or at least the age of majority in the
          jurisdiction where you reside or from which you use this Service.
        </p>
        <p>
          To access and use the Services, you must register for a Shopify
          account (“Account”) by providing your full legal name, current
          address, phone number, a valid email address, and any other
          information indicated as required. Shopify may reject your application
          for an Account, or cancel an existing Account, for any reason, in our
          sole discretion.
        </p>
        <p>
          You acknowledge that Shopify will use the email address you provide as
          the primary method for communication.
        </p>
        <p>
          You are responsible for keeping your password secure. Shopify cannot
          and will not be liable for any loss or damage from your failure to
          maintain the security of your Account and password.
        </p>
        <p>
          You are responsible for all activity and content such as photos,
          images, videos, graphics, written content, audio files, code,
          information, or data uploaded, collected, generated, stored,
          displayed, distributed, transmitted or exhibited on or in connection
          with your Account (“Materials”).
        </p>
        <p>
          A breach or violation of any term in the Terms of Service, including
          the AUP, as determined in the sole discretion of Shopify will result
          in an immediate termination of your services.
        </p>
        <p>Which means</p>
        <p>
          You are responsible for your Account and any Materials you upload to
          the Shopify Service. Remember that with any violation of these terms
          we will cancel your service.
        </p>

        <p>If we need to reach you, we will send you an email.</p>

        <ol>
          <li>Account Activation</li>
        </ol>

        <Scrollable.ScrollTo />
        <strong>2.1 Shopify Account</strong>

        <p>
          Subject to section 2.1.2, the person signing up for the Service will
          be the contracting party (“Account Owner”) for the purposes of our
          Terms of Service and will be the person who is authorized to use any
          corresponding account we may provide to the Account Owner in
          connection with the Service.
        </p>
        <p>
          If you are signing up for the Service on behalf of your employer, your
          employer shall be the Account Owner. If you are signing up for the
          Service on behalf of your employer, then you represent and warrant
          that you have the authority to bind your employer to our Terms of
          Service.
        </p>
        <p>2.2 PayPal Express Checkout and Shopify Payments Accounts</p>

        <p>
          Upon completion of sign up for the Service, Shopify will create a
          PayPal Express Checkout account on your behalf, using your email
          address. Depending on your location, Shopify may also create a Shopify
          Payments account on your behalf.
        </p>
        <p>
          You acknowledge that PayPal Express Checkout and/or Shopify Payments
          will be your default payments gateway(s) and that it is your sole
          responsibility as the Account Owner to activate and maintain these
          accounts. If you do not wish to keep either of the payment accounts
          active, it is your responsibility to deactivate them. For the
          avoidance of doubt, PayPal Express Checkout is a Third Party Service,
          as defined in Section 15 of these Terms of Service.
        </p>
        <p>2.3 Apple Pay for Safari Account</p>

        <p>
          Upon completion of sign up for the Service, Shopify will create an
          Apple Pay for Safari (“Apple Pay”) account on your behalf, using the
          URL(s) and business name associated with your Account. Depending on
          your location, Shopify may activate your Apple Pay account on your
          behalf, otherwise you will be required to activate your Apple Pay
          account within your Account admin. If you do not wish to keep your
          Apple Pay account active, it is your responsibility to deactivate it.
          For the avoidance of doubt, Apple Pay is a Third Party Service, as
          defined in Section 15 of these Terms of Service.
        </p>
        <p>
          If you use an Apple Pay supported payment gateway and your customers
          have enabled Apple Pay on their device, customers may purchase goods
          and services from your store using Apple Pay.
        </p>
        <p>
          By using Apple Pay on your store, you are agreeing to be bound by the
          Apple Pay Platform Web Merchant Terms and Conditions, as they may be
          amended by Apple from time to time. If Apple amends the Apple Pay
          Platform Web Merchant Terms and Conditions, the amended and restated
          version will be posted here:
          <a href="https://www.shopify.com/legal/apple-pay">
            https://www.shopify.com/legal/apple-pay
          </a>
          . Such amendments to the Apple Pay Platform Web Merchant Terms are
          effective as of the date of posting. Your continued use of Apple Pay
          on your store after the amended Apple Pay Platform Web Merchant Terms
          are posted constitutes your agreement to, and acceptance of, the
          amended Apple Pay Platform Web Merchant Terms. If you do not agree to
          any changes to the Apple Pay Platform Web Merchant Terms, de-activate
          your Apple Pay account and do not continue to use Apple Pay on your
          store.
        </p>
        <p>2.4 Google Payment</p>

        <p>
          Upon completion of sign up for the Service, if you have been enrolled
          in Shopify Payments, Shopify will also create a Google Payment account
          on your behalf. If you do not wish to keep your Google Payment account
          active, it is your responsibility to deactivate it. For the avoidance
          of doubt, Google Payment is a Third Party Service, as defined in
          Section 15 of these Terms of Service.
        </p>

        <p>
          If you use a Google Payment supported payment gateway and your
          customers have enabled Google Payment, customers may purchase goods
          and services from your store using Google Payment.
        </p>

        <p>
          By using Google Payment on your store, you are agreeing to be bound by
          the Google Payment API Terms of Service, as they may be amended by
          Google from time to time. If Google amends the Google Payment API
          Terms of Service, the amended and restated version will be posted
          here:
          <a href="https://payments.developers.google.com/terms/sellertos">
            https://payments.developers.google.com/terms/sellertos
          </a>
          . Such amendments to the Google Payment API Terms of Service are
          effective as of the date of posting. Your continued use of Google
          Payment on your store after the amended Google Payment API Terms of
          Service are posted constitutes your agreement to, and acceptance of,
          the amended Google Payment API Terms of Service. If you do not agree
          to any changes to the Google Payment API Terms of Service, de-activate
          your Google Payment account and do not continue to use Google Payment
          on your store.
        </p>

        <p>2.5 Domain Names</p>

        <p>
          Upon purchasing a domain name through Shopify, domain registration
          will be preset to automatically renew each year so long as your
          Shopify Account remains active. You acknowledge that it is your sole
          responsibility to deactivate the auto-renewal function should you
          choose to do so.
        </p>
        <p>Which means</p>
        <p>
          The person signing up for the Shopify Service is responsible for the
          account and is bound by these Terms of Service. If you signup on
          behalf of your employer, your employer owns the account and is also
          bound by our Terms of Service.
        </p>

        <p>
          We automatically create accounts for you to accept payments. You are
          responsible for activating and deactivating these accounts.
        </p>

        <p>
          Any domain you purchase through us will automatically renew unless you
          opt out.
        </p>

        <ol>
          <li>General Conditions</li>
        </ol>
        <p>
          You must read, agree with and accept all of the terms and conditions
          contained in these Terms of Service, including the AUP and the Privacy
          Policy before you may become a member of Shopify.
        </p>

        <p>
          Technical support is only provided to paying Account holders and is
          only available via email.
        </p>
        <p>
          The Terms of Service shall be governed by and interpreted in
          accordance with the laws of the Province of Ontario and the laws of
          Canada applicable therein, without regard to principles of conflicts
          of laws. The parties irrevocably and unconditionally submit to the
          exclusive jurisdiction of the courts of the Province of Ontario with
          respect to any dispute or claim arising out of or in connection with
          the Terms of Service. The United Nations Convention on Contracts for
          the International Sale of Goods will not apply to these Terms of
          Service and is hereby expressly excluded.
        </p>
        <p>
          You acknowledge and agree that Shopify may amend these Terms of
          Service at any time by posting the relevant amended and restated Terms
          of Service on Shopify’s website, available at
          <a href="https://www.shopify.com/legal/terms">
            https://www.shopify.com/legal/terms
          </a>
          and such amendments to the Terms of Service are effective as of the
          date of posting. Your continued use of the Services after the amended
          Terms of Service are posted to Shopify’s website constitutes your
          agreement to, and acceptance of, the amended Terms of Service. If you
          do not agree to any changes to the Terms of Service, do not continue
          to use the Service.
        </p>
        <p>
          You may not use the Shopify service for any illegal or unauthorized
          purpose nor may you, in the use of the Service, violate any laws in
          your jurisdiction (including but not limited to copyright laws), the
          laws applicable to you in your customer’s jurisdiction, or the laws of
          Canada and the Province of Ontario. You will comply with all
          applicable laws, rules and regulations in your use of the Service.
        </p>
        <p>
          You agree not to reproduce, duplicate, copy, sell, resell or exploit
          any portion of the Service, use of the Service, or access to the
          Service without the express written permission by Shopify.
        </p>
        <p>
          You shall not purchase search engine or other pay per click keywords
          (such as Google AdWords), or domain names that use Shopify or Shopify
          trademarks and/or variations and misspellings thereof.
        </p>
        <p>
          Questions about the Terms of Service should be sent to
          <a href="mailto:support@shopify.com">support@shopify.com</a>.
        </p>
        <p>
          You understand that your Materials (not including credit card
          information), may be transferred unencrypted and involve (a)
          transmissions over various networks; and (b) changes to conform and
          adapt to technical requirements of connecting networks or devices.
          Credit Card information is always encrypted during transfer over
          networks.
        </p>
        <p>
          You acknowledge and agree that your use of the Service, including
          information transmitted to or stored by Shopify, is governed by its
          privacy policy at
          <a href="https://www.shopify.com/legal/privacy">
            https://www.shopify.com/legal/privacy
          </a>
        </p>
        <p>
          The Terms of Service may be available in languages other than English.
          To the extent of any inconsistencies or conflicts between these
          English Terms of Service and Shopify’s Terms of Service available in
          another language, the most current English version of the Terms of
          Service at
          <a href="https://www.shopify.com/legal/terms">
            https://www.shopify.com/legal/terms
          </a>
          will prevail.
        </p>
        <p>Which means</p>
        <p>
          The Shopify service belongs to us. You are not allowed to rip it off
          or use it for any illegal or sketchy purpose.
        </p>

        <p>
          If a dispute arises the issue will be dealt with in the Province of
          Ontario.
        </p>

        <p>
          Your Materials may be transferred unencrypted and may be altered, but
          credit card information is always encrypted.
        </p>
      </Scrollable>
    </LegacyCard>
  );
}

export function WithScrollHint() {
  return (
    <LegacyCard title="Terms of service" sectioned>
      <Scrollable hint shadow style={{height: '200px'}} focusable>
        <p>
          By signing up for the Shopify service (“Service”) or any of the
          services of Shopify Inc. (“Shopify”) you are agreeing to be bound by
          the following terms and conditions (“Terms of Service”). The Services
          offered by Shopify under the Terms of Service include various products
          and services to help you create and manage a retail store, whether an
          online store (“Online Services”), a physical retail store (“POS
          Services”), or both. Any new features or tools which are added to the
          current Service shall be also subject to the Terms of Service. You can
          review the current version of the Terms of Service at any time at
          https://www.shopify.com/legal/terms. Shopify reserves the right to
          update and change the Terms of Service by posting updates and changes
          to the Shopify website. You are advised to check the Terms of Service
          from time to time for any updates or changes that may impact you.
        </p>
        <p>
          By signing up for the Shopify service (“Service”) or any of the
          services of Shopify Inc. (“Shopify”) you are agreeing to be bound by
          the following terms and conditions (“Terms of Service”). The Services
          offered by Shopify under the Terms of Service include various products
          and services to help you create and manage a retail store, whether an
          online store (“Online Services”), a physical retail store (“POS
          Services”), or both. Any new features or tools which are added to the
          current Service shall be also subject to the Terms of Service. You can
          review the current version of the Terms of Service at any time at
          https://www.shopify.com/legal/terms. Shopify reserves the right to
          update and change the Terms of Service by posting updates and changes
          to the Shopify website. You are advised to check the Terms of Service
          from time to time for any updates or changes that may impact you.
        </p>
        <p>
          By signing up for the Shopify service (“Service”) or any of the
          services of Shopify Inc. (“Shopify”) you are agreeing to be bound by
          the following terms and conditions (“Terms of Service”). The Services
          offered by Shopify under the Terms of Service include various products
          and services to help you create and manage a retail store, whether an
          online store (“Online Services”), a physical retail store (“POS
          Services”), or both. Any new features or tools which are added to the
          current Service shall be also subject to the Terms of Service. You can
          review the current version of the Terms of Service at any time at
          https://www.shopify.com/legal/terms. Shopify reserves the right to
          update and change the Terms of Service by posting updates and changes
          to the Shopify website. You are advised to check the Terms of Service
          from time to time for any updates or changes that may impact you.
        </p>
      </Scrollable>
    </LegacyCard>
  );
}

export function OnScrolledToBottom() {
  return (
    <LegacyCard title="Terms of service" sectioned>
      <Scrollable
        focusable
        style={{height: '200px'}}
        onScrolledToBottom={() => console.log('scrolled to bottom')}
      >
        <p>
          By signing up for the Shopify service (“Service”) or any of the
          services of Shopify Inc. (“Shopify”) you are agreeing to be bound by
          the following terms and conditions (“Terms of Service”). The Services
          offered by Shopify under the Terms of Service include various products
          and services to help you create and manage a retail store, whether an
          online store (“Online Services”), a physical retail store (“POS
          Services”), or both. Any new features or tools which are added to the
          current Service shall be also subject to the Terms of Service. You can
          review the current version of the Terms of Service at any time at
          https://www.shopify.com/legal/terms. Shopify reserves the right to
          update and change the Terms of Service by posting updates and changes
          to the Shopify website. You are advised to check the Terms of Service
          from time to time for any updates or changes that may impact you.
        </p>
        <p>
          By signing up for the Shopify service (“Service”) or any of the
          services of Shopify Inc. (“Shopify”) you are agreeing to be bound by
          the following terms and conditions (“Terms of Service”). The Services
          offered by Shopify under the Terms of Service include various products
          and services to help you create and manage a retail store, whether an
          online store (“Online Services”), a physical retail store (“POS
          Services”), or both. Any new features or tools which are added to the
          current Service shall be also subject to the Terms of Service. You can
          review the current version of the Terms of Service at any time at
          https://www.shopify.com/legal/terms. Shopify reserves the right to
          update and change the Terms of Service by posting updates and changes
          to the Shopify website. You are advised to check the Terms of Service
          from time to time for any updates or changes that may impact you.
        </p>
        <p>
          By signing up for the Shopify service (“Service”) or any of the
          services of Shopify Inc. (“Shopify”) you are agreeing to be bound by
          the following terms and conditions (“Terms of Service”). The Services
          offered by Shopify under the Terms of Service include various products
          and services to help you create and manage a retail store, whether an
          online store (“Online Services”), a physical retail store (“POS
          Services”), or both. Any new features or tools which are added to the
          current Service shall be also subject to the Terms of Service. You can
          review the current version of the Terms of Service at any time at
          https://www.shopify.com/legal/terms. Shopify reserves the right to
          update and change the Terms of Service by posting updates and changes
          to the Shopify website. You are advised to check the Terms of Service
          from time to time for any updates or changes that may impact you.
        </p>
      </Scrollable>
    </LegacyCard>
  );
}

export function UsingScrollToFromRef() {
  const scrollRef = useRef<ScrollableRef>(null);

  const handleOnClick = () => {
    scrollRef.current?.scrollTo(0);
  };

  return (
    <LegacyCard title="Terms of service" sectioned>
      <Scrollable ref={scrollRef} shadow style={{height: '200px'}}>
        <ol>
          <li>Account Terms</li>
        </ol>
        <p>
          You must be 18 years or older or at least the age of majority in the
          jurisdiction where you reside or from which you use this Service.
        </p>
        <p>
          To access and use the Services, you must register for a Shopify
          account (“Account”) by providing your full legal name, current
          address, phone number, a valid email address, and any other
          information indicated as required. Shopify may reject your application
          for an Account, or cancel an existing Account, for any reason, in our
          sole discretion.
        </p>
        <p>
          You acknowledge that Shopify will use the email address you provide as
          the primary method for communication.
        </p>
        <p>
          You are responsible for keeping your password secure. Shopify cannot
          and will not be liable for any loss or damage from your failure to
          maintain the security of your Account and password.
        </p>
        <p>
          You are responsible for all activity and content such as photos,
          images, videos, graphics, written content, audio files, code,
          information, or data uploaded, collected, generated, stored,
          displayed, distributed, transmitted or exhibited on or in connection
          with your Account (“Materials”).
        </p>
        <p>
          A breach or violation of any term in the Terms of Service, including
          the AUP, as determined in the sole discretion of Shopify will result
          in an immediate termination of your services.
        </p>
        <p>Which means</p>
        <p>
          You are responsible for your Account and any Materials you upload to
          the Shopify Service. Remember that with any violation of these terms
          we will cancel your service.
        </p>

        <p>If we need to reach you, we will send you an email.</p>

        <ol>
          <li>Account Activation</li>
        </ol>

        <strong>2.1 Shopify Account</strong>

        <p>
          Subject to section 2.1.2, the person signing up for the Service will
          be the contracting party (“Account Owner”) for the purposes of our
          Terms of Service and will be the person who is authorized to use any
          corresponding account we may provide to the Account Owner in
          connection with the Service.
        </p>
        <p>
          If you are signing up for the Service on behalf of your employer, your
          employer shall be the Account Owner. If you are signing up for the
          Service on behalf of your employer, then you represent and warrant
          that you have the authority to bind your employer to our Terms of
          Service.
        </p>
        <p>2.2 PayPal Express Checkout and Shopify Payments Accounts</p>

        <p>
          Upon completion of sign up for the Service, Shopify will create a
          PayPal Express Checkout account on your behalf, using your email
          address. Depending on your location, Shopify may also create a Shopify
          Payments account on your behalf.
        </p>
        <p>
          You acknowledge that PayPal Express Checkout and/or Shopify Payments
          will be your default payments gateway(s) and that it is your sole
          responsibility as the Account Owner to activate and maintain these
          accounts. If you do not wish to keep either of the payment accounts
          active, it is your responsibility to deactivate them. For the
          avoidance of doubt, PayPal Express Checkout is a Third Party Service,
          as defined in Section 15 of these Terms of Service.
        </p>
        <p>2.3 Apple Pay for Safari Account</p>

        <p>
          Upon completion of sign up for the Service, Shopify will create an
          Apple Pay for Safari (“Apple Pay”) account on your behalf, using the
          URL(s) and business name associated with your Account. Depending on
          your location, Shopify may activate your Apple Pay account on your
          behalf, otherwise you will be required to activate your Apple Pay
          account within your Account admin. If you do not wish to keep your
          Apple Pay account active, it is your responsibility to deactivate it.
          For the avoidance of doubt, Apple Pay is a Third Party Service, as
          defined in Section 15 of these Terms of Service.
        </p>
        <p>
          If you use an Apple Pay supported payment gateway and your customers
          have enabled Apple Pay on their device, customers may purchase goods
          and services from your store using Apple Pay.
        </p>
        <p>
          By using Apple Pay on your store, you are agreeing to be bound by the
          Apple Pay Platform Web Merchant Terms and Conditions, as they may be
          amended by Apple from time to time. If Apple amends the Apple Pay
          Platform Web Merchant Terms and Conditions, the amended and restated
          version will be posted here:
          <a href="https://www.shopify.com/legal/apple-pay">
            https://www.shopify.com/legal/apple-pay
          </a>
          . Such amendments to the Apple Pay Platform Web Merchant Terms are
          effective as of the date of posting. Your continued use of Apple Pay
          on your store after the amended Apple Pay Platform Web Merchant Terms
          are posted constitutes your agreement to, and acceptance of, the
          amended Apple Pay Platform Web Merchant Terms. If you do not agree to
          any changes to the Apple Pay Platform Web Merchant Terms, de-activate
          your Apple Pay account and do not continue to use Apple Pay on your
          store.
        </p>
        <p>2.4 Google Payment</p>

        <p>
          Upon completion of sign up for the Service, if you have been enrolled
          in Shopify Payments, Shopify will also create a Google Payment account
          on your behalf. If you do not wish to keep your Google Payment account
          active, it is your responsibility to deactivate it. For the avoidance
          of doubt, Google Payment is a Third Party Service, as defined in
          Section 15 of these Terms of Service.
        </p>

        <p>
          If you use a Google Payment supported payment gateway and your
          customers have enabled Google Payment, customers may purchase goods
          and services from your store using Google Payment.
        </p>

        <p>
          By using Google Payment on your store, you are agreeing to be bound by
          the Google Payment API Terms of Service, as they may be amended by
          Google from time to time. If Google amends the Google Payment API
          Terms of Service, the amended and restated version will be posted
          here:
          <a href="https://payments.developers.google.com/terms/sellertos">
            https://payments.developers.google.com/terms/sellertos
          </a>
          . Such amendments to the Google Payment API Terms of Service are
          effective as of the date of posting. Your continued use of Google
          Payment on your store after the amended Google Payment API Terms of
          Service are posted constitutes your agreement to, and acceptance of,
          the amended Google Payment API Terms of Service. If you do not agree
          to any changes to the Google Payment API Terms of Service, de-activate
          your Google Payment account and do not continue to use Google Payment
          on your store.
        </p>

        <p>2.5 Domain Names</p>

        <p>
          Upon purchasing a domain name through Shopify, domain registration
          will be preset to automatically renew each year so long as your
          Shopify Account remains active. You acknowledge that it is your sole
          responsibility to deactivate the auto-renewal function should you
          choose to do so.
        </p>
        <p>Which means</p>
        <p>
          The person signing up for the Shopify Service is responsible for the
          account and is bound by these Terms of Service. If you signup on
          behalf of your employer, your employer owns the account and is also
          bound by our Terms of Service.
        </p>

        <p>
          We automatically create accounts for you to accept payments. You are
          responsible for activating and deactivating these accounts.
        </p>

        <p>
          Any domain you purchase through us will automatically renew unless you
          opt out.
        </p>

        <ol>
          <li>General Conditions</li>
        </ol>
        <p>
          You must read, agree with and accept all of the terms and conditions
          contained in these Terms of Service, including the AUP and the Privacy
          Policy before you may become a member of Shopify.
        </p>

        <p>
          Technical support is only provided to paying Account holders and is
          only available via email.
        </p>
        <p>
          The Terms of Service shall be governed by and interpreted in
          accordance with the laws of the Province of Ontario and the laws of
          Canada applicable therein, without regard to principles of conflicts
          of laws. The parties irrevocably and unconditionally submit to the
          exclusive jurisdiction of the courts of the Province of Ontario with
          respect to any dispute or claim arising out of or in connection with
          the Terms of Service. The United Nations Convention on Contracts for
          the International Sale of Goods will not apply to these Terms of
          Service and is hereby expressly excluded.
        </p>
        <p>
          You acknowledge and agree that Shopify may amend these Terms of
          Service at any time by posting the relevant amended and restated Terms
          of Service on Shopify’s website, available at
          <a href="https://www.shopify.com/legal/terms">
            https://www.shopify.com/legal/terms
          </a>
          and such amendments to the Terms of Service are effective as of the
          date of posting. Your continued use of the Services after the amended
          Terms of Service are posted to Shopify’s website constitutes your
          agreement to, and acceptance of, the amended Terms of Service. If you
          do not agree to any changes to the Terms of Service, do not continue
          to use the Service.
        </p>
        <p>
          You may not use the Shopify service for any illegal or unauthorized
          purpose nor may you, in the use of the Service, violate any laws in
          your jurisdiction (including but not limited to copyright laws), the
          laws applicable to you in your customer’s jurisdiction, or the laws of
          Canada and the Province of Ontario. You will comply with all
          applicable laws, rules and regulations in your use of the Service.
        </p>
        <p>
          You agree not to reproduce, duplicate, copy, sell, resell or exploit
          any portion of the Service, use of the Service, or access to the
          Service without the express written permission by Shopify.
        </p>
        <p>
          You shall not purchase search engine or other pay per click keywords
          (such as Google AdWords), or domain names that use Shopify or Shopify
          trademarks and/or variations and misspellings thereof.
        </p>
        <p>
          Questions about the Terms of Service should be sent to
          <a href="mailto:support@shopify.com">support@shopify.com</a>.
        </p>
        <p>
          You understand that your Materials (not including credit card
          information), may be transferred unencrypted and involve (a)
          transmissions over various networks; and (b) changes to conform and
          adapt to technical requirements of connecting networks or devices.
          Credit Card information is always encrypted during transfer over
          networks.
        </p>
        <p>
          You acknowledge and agree that your use of the Service, including
          information transmitted to or stored by Shopify, is governed by its
          privacy policy at
          <a href="https://www.shopify.com/legal/privacy">
            https://www.shopify.com/legal/privacy
          </a>
        </p>
        <p>
          The Terms of Service may be available in languages other than English.
          To the extent of any inconsistencies or conflicts between these
          English Terms of Service and Shopify’s Terms of Service available in
          another language, the most current English version of the Terms of
          Service at
          <a href="https://www.shopify.com/legal/terms">
            https://www.shopify.com/legal/terms
          </a>
          will prevail.
        </p>
        <p>Which means</p>
        <p>
          The Shopify service belongs to us. You are not allowed to rip it off
          or use it for any illegal or sketchy purpose.
        </p>

        <p>
          If a dispute arises the issue will be dealt with in the Province of
          Ontario.
        </p>

        <p>
          Your Materials may be transferred unencrypted and may be altered, but
          credit card information is always encrypted.
        </p>
        <Button onClick={handleOnClick}>Scroll to top</Button>
      </Scrollable>
    </LegacyCard>
  );
}

export function UsingInstantScrollToFromRef() {
  const scrollRef = useRef<ScrollableRef>(null);

  const handleOnClick = () => {
    scrollRef.current?.scrollTo(0, {behavior: 'instant'});
  };

  return (
    <LegacyCard title="Terms of service" sectioned>
      <Scrollable ref={scrollRef} shadow style={{height: '200px'}}>
        <ol>
          <li>Account Terms</li>
        </ol>
        <p>
          You must be 18 years or older or at least the age of majority in the
          jurisdiction where you reside or from which you use this Service.
        </p>
        <p>
          To access and use the Services, you must register for a Shopify
          account (“Account”) by providing your full legal name, current
          address, phone number, a valid email address, and any other
          information indicated as required. Shopify may reject your application
          for an Account, or cancel an existing Account, for any reason, in our
          sole discretion.
        </p>
        <p>
          You acknowledge that Shopify will use the email address you provide as
          the primary method for communication.
        </p>
        <p>
          You are responsible for keeping your password secure. Shopify cannot
          and will not be liable for any loss or damage from your failure to
          maintain the security of your Account and password.
        </p>
        <p>
          You are responsible for all activity and content such as photos,
          images, videos, graphics, written content, audio files, code,
          information, or data uploaded, collected, generated, stored,
          displayed, distributed, transmitted or exhibited on or in connection
          with your Account (“Materials”).
        </p>
        <p>
          A breach or violation of any term in the Terms of Service, including
          the AUP, as determined in the sole discretion of Shopify will result
          in an immediate termination of your services.
        </p>
        <p>Which means</p>
        <p>
          You are responsible for your Account and any Materials you upload to
          the Shopify Service. Remember that with any violation of these terms
          we will cancel your service.
        </p>

        <p>If we need to reach you, we will send you an email.</p>

        <ol>
          <li>Account Activation</li>
        </ol>

        <strong>2.1 Shopify Account</strong>

        <p>
          Subject to section 2.1.2, the person signing up for the Service will
          be the contracting party (“Account Owner”) for the purposes of our
          Terms of Service and will be the person who is authorized to use any
          corresponding account we may provide to the Account Owner in
          connection with the Service.
        </p>
        <p>
          If you are signing up for the Service on behalf of your employer, your
          employer shall be the Account Owner. If you are signing up for the
          Service on behalf of your employer, then you represent and warrant
          that you have the authority to bind your employer to our Terms of
          Service.
        </p>
        <p>2.2 PayPal Express Checkout and Shopify Payments Accounts</p>

        <p>
          Upon completion of sign up for the Service, Shopify will create a
          PayPal Express Checkout account on your behalf, using your email
          address. Depending on your location, Shopify may also create a Shopify
          Payments account on your behalf.
        </p>
        <p>
          You acknowledge that PayPal Express Checkout and/or Shopify Payments
          will be your default payments gateway(s) and that it is your sole
          responsibility as the Account Owner to activate and maintain these
          accounts. If you do not wish to keep either of the payment accounts
          active, it is your responsibility to deactivate them. For the
          avoidance of doubt, PayPal Express Checkout is a Third Party Service,
          as defined in Section 15 of these Terms of Service.
        </p>
        <p>2.3 Apple Pay for Safari Account</p>

        <p>
          Upon completion of sign up for the Service, Shopify will create an
          Apple Pay for Safari (“Apple Pay”) account on your behalf, using the
          URL(s) and business name associated with your Account. Depending on
          your location, Shopify may activate your Apple Pay account on your
          behalf, otherwise you will be required to activate your Apple Pay
          account within your Account admin. If you do not wish to keep your
          Apple Pay account active, it is your responsibility to deactivate it.
          For the avoidance of doubt, Apple Pay is a Third Party Service, as
          defined in Section 15 of these Terms of Service.
        </p>
        <p>
          If you use an Apple Pay supported payment gateway and your customers
          have enabled Apple Pay on their device, customers may purchase goods
          and services from your store using Apple Pay.
        </p>
        <p>
          By using Apple Pay on your store, you are agreeing to be bound by the
          Apple Pay Platform Web Merchant Terms and Conditions, as they may be
          amended by Apple from time to time. If Apple amends the Apple Pay
          Platform Web Merchant Terms and Conditions, the amended and restated
          version will be posted here:
          <a href="https://www.shopify.com/legal/apple-pay">
            https://www.shopify.com/legal/apple-pay
          </a>
          . Such amendments to the Apple Pay Platform Web Merchant Terms are
          effective as of the date of posting. Your continued use of Apple Pay
          on your store after the amended Apple Pay Platform Web Merchant Terms
          are posted constitutes your agreement to, and acceptance of, the
          amended Apple Pay Platform Web Merchant Terms. If you do not agree to
          any changes to the Apple Pay Platform Web Merchant Terms, de-activate
          your Apple Pay account and do not continue to use Apple Pay on your
          store.
        </p>
        <p>2.4 Google Payment</p>

        <p>
          Upon completion of sign up for the Service, if you have been enrolled
          in Shopify Payments, Shopify will also create a Google Payment account
          on your behalf. If you do not wish to keep your Google Payment account
          active, it is your responsibility to deactivate it. For the avoidance
          of doubt, Google Payment is a Third Party Service, as defined in
          Section 15 of these Terms of Service.
        </p>

        <p>
          If you use a Google Payment supported payment gateway and your
          customers have enabled Google Payment, customers may purchase goods
          and services from your store using Google Payment.
        </p>

        <p>
          By using Google Payment on your store, you are agreeing to be bound by
          the Google Payment API Terms of Service, as they may be amended by
          Google from time to time. If Google amends the Google Payment API
          Terms of Service, the amended and restated version will be posted
          here:
          <a href="https://payments.developers.google.com/terms/sellertos">
            https://payments.developers.google.com/terms/sellertos
          </a>
          . Such amendments to the Google Payment API Terms of Service are
          effective as of the date of posting. Your continued use of Google
          Payment on your store after the amended Google Payment API Terms of
          Service are posted constitutes your agreement to, and acceptance of,
          the amended Google Payment API Terms of Service. If you do not agree
          to any changes to the Google Payment API Terms of Service, de-activate
          your Google Payment account and do not continue to use Google Payment
          on your store.
        </p>

        <p>2.5 Domain Names</p>

        <p>
          Upon purchasing a domain name through Shopify, domain registration
          will be preset to automatically renew each year so long as your
          Shopify Account remains active. You acknowledge that it is your sole
          responsibility to deactivate the auto-renewal function should you
          choose to do so.
        </p>
        <p>Which means</p>
        <p>
          The person signing up for the Shopify Service is responsible for the
          account and is bound by these Terms of Service. If you signup on
          behalf of your employer, your employer owns the account and is also
          bound by our Terms of Service.
        </p>

        <p>
          We automatically create accounts for you to accept payments. You are
          responsible for activating and deactivating these accounts.
        </p>

        <p>
          Any domain you purchase through us will automatically renew unless you
          opt out.
        </p>

        <ol>
          <li>General Conditions</li>
        </ol>
        <p>
          You must read, agree with and accept all of the terms and conditions
          contained in these Terms of Service, including the AUP and the Privacy
          Policy before you may become a member of Shopify.
        </p>

        <p>
          Technical support is only provided to paying Account holders and is
          only available via email.
        </p>
        <p>
          The Terms of Service shall be governed by and interpreted in
          accordance with the laws of the Province of Ontario and the laws of
          Canada applicable therein, without regard to principles of conflicts
          of laws. The parties irrevocably and unconditionally submit to the
          exclusive jurisdiction of the courts of the Province of Ontario with
          respect to any dispute or claim arising out of or in connection with
          the Terms of Service. The United Nations Convention on Contracts for
          the International Sale of Goods will not apply to these Terms of
          Service and is hereby expressly excluded.
        </p>
        <p>
          You acknowledge and agree that Shopify may amend these Terms of
          Service at any time by posting the relevant amended and restated Terms
          of Service on Shopify’s website, available at
          <a href="https://www.shopify.com/legal/terms">
            https://www.shopify.com/legal/terms
          </a>
          and such amendments to the Terms of Service are effective as of the
          date of posting. Your continued use of the Services after the amended
          Terms of Service are posted to Shopify’s website constitutes your
          agreement to, and acceptance of, the amended Terms of Service. If you
          do not agree to any changes to the Terms of Service, do not continue
          to use the Service.
        </p>
        <p>
          You may not use the Shopify service for any illegal or unauthorized
          purpose nor may you, in the use of the Service, violate any laws in
          your jurisdiction (including but not limited to copyright laws), the
          laws applicable to you in your customer’s jurisdiction, or the laws of
          Canada and the Province of Ontario. You will comply with all
          applicable laws, rules and regulations in your use of the Service.
        </p>
        <p>
          You agree not to reproduce, duplicate, copy, sell, resell or exploit
          any portion of the Service, use of the Service, or access to the
          Service without the express written permission by Shopify.
        </p>
        <p>
          You shall not purchase search engine or other pay per click keywords
          (such as Google AdWords), or domain names that use Shopify or Shopify
          trademarks and/or variations and misspellings thereof.
        </p>
        <p>
          Questions about the Terms of Service should be sent to
          <a href="mailto:support@shopify.com">support@shopify.com</a>.
        </p>
        <p>
          You understand that your Materials (not including credit card
          information), may be transferred unencrypted and involve (a)
          transmissions over various networks; and (b) changes to conform and
          adapt to technical requirements of connecting networks or devices.
          Credit Card information is always encrypted during transfer over
          networks.
        </p>
        <p>
          You acknowledge and agree that your use of the Service, including
          information transmitted to or stored by Shopify, is governed by its
          privacy policy at
          <a href="https://www.shopify.com/legal/privacy">
            https://www.shopify.com/legal/privacy
          </a>
        </p>
        <p>
          The Terms of Service may be available in languages other than English.
          To the extent of any inconsistencies or conflicts between these
          English Terms of Service and Shopify’s Terms of Service available in
          another language, the most current English version of the Terms of
          Service at
          <a href="https://www.shopify.com/legal/terms">
            https://www.shopify.com/legal/terms
          </a>
          will prevail.
        </p>
        <p>Which means</p>
        <p>
          The Shopify service belongs to us. You are not allowed to rip it off
          or use it for any illegal or sketchy purpose.
        </p>

        <p>
          If a dispute arises the issue will be dealt with in the Province of
          Ontario.
        </p>

        <p>
          Your Materials may be transferred unencrypted and may be altered, but
          credit card information is always encrypted.
        </p>
        <Button onClick={handleOnClick}>Scroll to top</Button>
      </Scrollable>
    </LegacyCard>
  );
}

export function WithShadowOverComplexChildren() {
  return (
    <BlockStack gap="400">
      <Text as="p" variant="bodyLg" fontWeight="bold">
        NOTE: Red shadow is for demo/debug purposes only.
        <br />
        DO NOT do this in production.
      </Text>
      <Scrollable
        shadow
        style={{
          height: '200px',
          maxWidth: '40rem',
          backgroundColor: 'var(--p-color-bg-surface)',
          // Setting red here so the storybook is really obvious that the shadow
          // overlays the content (particularly the banner)
          /* @ts-expect-error TS doesn't understand CSS vars */
          '--pc-scrollable-shadow-color': 'rgba(255, 0, 0, 0.85)',
        }}
      >
        <Box padding="400">
          <Banner title="Payment details">
            <p>Last updated on: September 6, 2022</p>

            <p>
              Welcome to Shopify! By signing up for a Shopify Account (as
              defined in Section 1) or by using any Shopify Services (as defined
              below), you are agreeing to be bound by the following terms and
              conditions (the “<strong>Terms of Service</strong>”).
            </p>

            <p>
              As used in these Terms of Service, “<strong>we</strong>”, “
              <strong>us</strong>”, “<strong>our</strong>” and “
              <strong>Shopify</strong>” means the applicable Shopify Contracting
              Party (as defined in Section 13 below), and “<strong>you</strong>”
              means the Shopify User (if registering for or using a Shopify
              Service as an individual), or the business employing the Shopify
              User (if registering for or using a Shopify Service as a business)
              and any of its affiliates.
            </p>
          </Banner>

          <FormLayout>
            <FormLayout.Group>
              <TextField label="First name" autoComplete="off" />
              <TextField label="Last name" autoComplete="off" />
            </FormLayout.Group>

            <FormLayout.Group>
              <TextField label="Address" autoComplete="off" />
              <TextField label="Apartment, suite, etc." autoComplete="off" />
            </FormLayout.Group>

            <FormLayout.Group>
              <TextField label="City" autoComplete="off" />
              <TextField label="Province" autoComplete="off" />
              <TextField label="Postal code" autoComplete="off" />
            </FormLayout.Group>
          </FormLayout>

          <p>
            Shopify provides a complete commerce platform that enables merchants
            to unify their commerce activities. Among other features, this
            platform includes a range of tools for merchants to build and
            customize online stores, sell in multiple places (including web,
            mobile, social media, online marketplaces and other online locations
            (“<strong>Online Services</strong>”) and in person (“
            <strong>POS Services</strong>”)), manage products, inventory,
            payments, fulfillment, shipping, business operations, marketing and
            advertising, and engage with existing and potential customers. Any
            such service or services offered by Shopify are referred to in these
            Terms of Services as the “<strong>Service(s)</strong>”. Any new
            features or tools which are added to the current Services will also
            be subject to the Terms of Service. You can review the current
            version of the Terms of Service at any time at
            <a href="https://www.shopify.com/legal/terms">
              https://www.shopify.com/legal/terms
            </a>
            .
          </p>
          <p>
            You must read, agree with and accept all of the terms and conditions
            contained or expressly referenced in these Terms of Service,
            including Shopify’s
            <a href="https://www.shopify.com/legal/aup">
              Acceptable Use Policy
            </a>
            (“<strong>AUP</strong>”) and
            <a href="https://www.shopify.com/legal/privacy">Privacy Policy</a>,
            and, if applicable, the
            <a href="https://www.shopify.com/legal/eu-terms">
              Supplementary Terms of Service for E.U. Merchants
            </a>
            (“<strong>EU Terms</strong>”), the Shopify
            <a href="https://www.shopify.com/legal/api-terms">
              API License and Terms of Use
            </a>
            (“<strong>API Terms</strong>”) and the Shopify
            <a href="https://www.shopify.com/legal/dpa">
              Data Processing Addendum
            </a>
            (“<strong>DPA</strong>”) before you may sign up for a Shopify
            Account or use any Shopify Service. Additionally, if you offer goods
            or services in relation to COVID-19, you must read, acknowledge and
            agree to the
            <a href="/legal/rules-of-engagement-covid19">
              Rules of Engagement for Sale of COVID-19 Related Products
            </a>
            .
          </p>

          <p>
            <strong>
              Everyday language summaries are provided for convenience only and
              appear in bold near each section, but these summaries are not
              legally binding. Please read the Terms of Service, including any
              document referred to in these Terms of Service, for the complete
              picture of your legal requirements. By using Shopify or any
              Shopify services, you are agreeing to these terms. Be sure to
              occasionally check back for updates.
            </strong>
          </p>
        </Box>
      </Scrollable>
    </BlockStack>
  );
}
