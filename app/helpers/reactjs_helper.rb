module ReactjsHelper

  def mount_react_component(name, selector, data)
    javascript_tag defer: 'defer' do
      "$(reactMounter.mount('#{name}', '#{selector}', #{data}));".html_safe
    end
  end
end
