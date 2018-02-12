/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint max-len: ["off"] */

(function() {
  const expect = chai.expect;

  describe('howto-checkbox', function() {
    before(howtoComponents.before());
    after(howtoComponents.after());
    beforeEach(function() {
      this.container.innerHTML = `<howto-checkbox></howto-checkbox>`;
      return howtoComponents.waitForElement('howto-checkbox')
        .then(_ => {
          this.checkbox = this.container.querySelector('howto-checkbox');
        });
    });

    it('should add a [role] to the checkbox', async function() {
      var accessibleCheckbox = await window.getComputedAccessibleNode(this.checkbox);
      expect(accessibleCheckbox.role).to.equal('checkBox');
    });

    it('should add a [tabindex] to the checkbox', function() {
      expect(this.checkbox.getAttribute('tabindex')).to.equal('0');
    });

    describe('checked', function() {
      it('should toggle [checked] and [aria-checked] when calling ' +
        '_toggleChecked()', async function() {
          expect(this.checkbox.checked).to.be.false;
          let accessibleBox = await window.getComputedAccessibleNode(this.checkbox);
          expect(accessibleBox.checked).to.equal("false");

          this.checkbox._toggleChecked();
          await accessibleBox.ensureUpToDate();
          expect(accessibleBox.checked).to.equal("true");
          expect(this.checkbox.checked).to.be.true;
        });

      it('should toggle [checked] and [aria-checked] when setting .checked', async function() {
        expect(this.checkbox.checked).to.be.false;
        let accessibleBox = await window.getComputedAccessibleNode(this.checkbox);
        expect(accessibleBox.checked).to.equal("false");

        this.checkbox.checked = true;
        await accessibleBox.ensureUpToDate();
        expect(accessibleBox.checked).to.equal("true");
        expect(this.checkbox.checked).to.be.true;

        this.checkbox.checked = false;
        await accessibleBox.ensureUpToDate();
        expect(accessibleBox.checked).to.equal("false");
        expect(this.checkbox.checked).to.be.false;
      });

      it('should handle truthy/falsy values for .checked', async function() {
        expect(this.checkbox.checked).to.be.false;
        let accessibleBox = await window.getComputedAccessibleNode(this.checkbox);
        expect(accessibleBox.checked).to.equal("false");

        this.checkbox.checked = '0';
        await accessibleBox.ensureUpToDate();
        expect(accessibleBox.checked).to.equal("true");
        expect(this.checkbox.checked).to.be.true;

        this.checkbox.checked = undefined;
        await accessibleBox.ensureUpToDate();
        expect(accessibleBox.checked).to.equal("false");
        expect(this.checkbox.checked).to.be.false;

        this.checkbox.checked = 1;
        await accessibleBox.ensureUpToDate();
        expect(accessibleBox.checked).to.equal("true");
        expect(this.checkbox.checked).to.be.true;

      });

      it('should toggle .checked, [aria-checked] when setting [checked]', async function() {
        expect(this.checkbox.checked).to.be.false;
        let accessibleBox = await window.getComputedAccessibleNode(this.checkbox);
        expect(accessibleBox.checked).to.equal("false");

        this.checkbox.setAttribute('checked', '');
        await accessibleBox.ensureUpToDate();
        expect(accessibleBox.checked).to.equal("true");
        expect(this.checkbox.checked).to.be.true;

        this.checkbox.removeAttribute('checked');
        await accessibleBox.ensureUpToDate();
        expect(accessibleBox.checked).to.equal("false");
        expect(this.checkbox.checked).to.be.false;
      });
    });

    describe('disabled', function() {
      it('should toggle [disabled], [aria-disabled], and [tabindex] when setting .disabled', async function() {
        expect(this.checkbox.disabled).to.be.false;
        let accessibleBox = await window.getComputedAccessibleNode(this.checkbox);
        expect(accessibleBox.disabled).to.be.false;

        this.checkbox.disabled = true;
        await accessibleBox.ensureUpToDate();
        expect(accessibleBox.disabled).to.be.true;
        expect(this.checkbox.disabled).to.be.true;

        this.checkbox.disabled = false;
        await accessibleBox.ensureUpToDate();
        expect(accessibleBox.disabled).to.be.false;
        expect(this.checkbox.disabled).to.be.false;
      });

      it('should handle truthy/falsy values for .disabled', async function() {
        expect(this.checkbox.disabled).to.be.false;
        let accessibleBox = await window.getComputedAccessibleNode(this.checkbox);
        expect(accessibleBox.disabled).to.be.false;

        this.checkbox.disabled = '0';
        await accessibleBox.ensureUpToDate();
        expect(accessibleBox.disabled).to.be.true;
        expect(this.checkbox.disabled).to.be.true;

        this.checkbox.disabled = undefined;
        await accessibleBox.ensureUpToDate();
        expect(accessibleBox.disabled).to.be.false;
        expect(this.checkbox.disabled).to.be.false;

        this.checkbox.disabled = 1;
        await accessibleBox.ensureUpToDate();
        expect(accessibleBox.disabled).to.be.true;
        expect(this.checkbox.disabled).to.be.true;

      });

      it('should toggle .disabled, [aria-disabled] when setting [disabled]', async function() {
        expect(this.checkbox.disabled).to.be.false;
        let accessibleBox = await window.getComputedAccessibleNode(this.checkbox);
        expect(accessibleBox.disabled).to.be.false;

        this.checkbox.setAttribute('disabled', '');
        await accessibleBox.ensureUpToDate();
        expect(accessibleBox.disabled).to.equal(true);
        expect(this.checkbox.disabled).to.be.true;

        this.checkbox.removeAttribute('disabled');
        await accessibleBox.ensureUpToDate();
        expect(accessibleBox.disabled).to.be.false;
        expect(this.checkbox.disabled).to.be.false;
      });
    });
  });
})();
